import { Form, useLoaderData, useNavigate, useParams } from "react-router-dom";

import axiosInstance from "utils/axiosInstance";

import Input from "components/ui/inputs/Input";
import Button from "components/ui/inputs/Button";
import Alert from "components/ui/Alert";

let globalFile;
let alert;

// with this component the leader of the group can change information of group
export default function EditGroupInfoPage() {
    const members = useLoaderData();
    const params = useParams();
    const navigate = useNavigate();
    const alertRef = useRef();
            
    useEffect(() => {
        alert = alertRef.current;        
    }, [alertRef])

    function handleFileChange(event) {
        globalFile = event.target.files[0];
    }

    function handleKickOutClick(userId) {
        axiosInstance.delete(`/group/member?groupId=${params.groupId}&userId=${userId}`)
            .then(() => {
                navigate("");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <div className="bg-white rounded-lg p-4 flex flex-col items-stretch gap-12">
            {/* edit info panel */}
            <p className="text-center text-3xl font-bold">Edit group</p>
            <Form method="POST" className="px-8 flex flex-col gap-4">
                <Alert ref={alertRef} />
                <Input type="file" accept="image/*" onChange={handleFileChange} text="Group image" />
                <Input type="text" name="name" text="Group name" />
                <div className="flex gap-8">
                    <Input type="password" name="password" text="New password" />
                    <Input type="password" name="password-again" text="New password again" />
                </div>
                <div className="m-auto">
                    <Button>Save changes</Button>
                </div>
            </Form>
            {/* kick out member panel */}
            <div className="bg-dark rounded-lg p-4 grid grid-cols-[1fr_1fr] gap-12">
                {
                    members.length > 0 ?
                    members.map(member => 
                        <div key={member.id} className="flex gap-4">
                            <div className="bg-white rounded-md px-4 flex justify-between items-center grow">
                                <p className="text-dark text-lg font-semibold">{member.username}</p>
                                <p className="text-dark font-semibold">{member.point} pt</p>
                            </div>
                            <Button onClick={() => {handleKickOutClick(member.id)}}>Kick out</Button>
                        </div>
                    ) :
                    <p className="text-white text-2xl font-bold text-center col-span-2">There's no members in this group!</p>
                }
            </div>
        </div>
    )
}

export async function loader({ request, params }) {
    console.log(params.groupId);
    
    return axiosInstance.get(`/group/members?groupId=${params.groupId}&omitLeader=${true}`)
        .then(response => {
            return response.data.members;
        })
        .catch(err => {
            console.log(err);
            
            return Promise.resolve();
        })
}

export async function action({ request, params }) {
    const data = await request.formData();

    if(data.get('password') === data.get('password-again')) { // cheks if given passwords are matching
        const requestData = {
            groupId: params.groupId,
            ...(globalFile && { image: globalFile }),
            ...(data.get('name') !== '' && { name: data.get('name') }),
            ...(data.get('password') !== '' && { password: data.get('password') })
        }

        return axiosInstance.patch('/group/info', requestData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                return Promise.resolve();
            })
            .catch(err => {
                alert.show(err.response.data.message);
                
                return Promise.resolve();
            })
    }

    alert.show("Given passwords don't match!");

    return Promise.resolve();
        
}