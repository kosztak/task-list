import { useLoaderData } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"
import DailyBar from "../components/ui/task-bars/DailyBar";

export default function DailiesPage() {
    const dailiesList = useLoaderData();
    console.log(dailiesList);
    


    function generateDailyList() {
            return dailiesList.map(daily => {
                return (
                    <DailyBar key={daily._id} task={daily} />
                )
            })
        }

    return(
        <div className="bg-white rounded-lg p-4 flex flex-col items-stretch gap-8">
            <p className="text-center text-3xl font-bold">Dailies</p>
            {dailiesList.length === 0 ?
                <p className="text-center text-lg">You have no daily tasks</p> :
                <div className="flex flex-col gap-4">
                    {generateDailyList()}
                </div>
            }
        </div>
    )
}

export async function loader() {
    return axiosInstance.get("/user/dailies")
        .then(dailies => {
            return dailies.data;
        })
        .catch(err => {
            return Promise.resolve();
        })
}