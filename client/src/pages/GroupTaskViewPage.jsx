import { useLoaderData, useNavigate, useParams } from "react-router-dom";

import axiosInstance from "utils/axiosInstance";

import Button from "components/ui/inputs/Button";

// On this vomponent the group leader can see a list of all dailies or to-dos.
export default function GroupTaskViewPage() {
  const navigate = useNavigate();
  const isDaily = useParams().type === "dailies";
  const taskDataList = useLoaderData();

  function handleEditTask(task) {
    navigate(task.id);
  }

  function getTaskList() {
    // generates a list for the tasks
    return taskDataList.map((task) => (
      <div key={task.id} className="flex gap-2 justify-between">
        <div className="grid gap-2 border-dark border-2 rounded p-2 grow">
          <p>Name: {task.name}</p>
          <p>Description: {task.description}</p>
          <p>
            {isDaily ? "Start: " : "Due: "} {task.date.split("T")[0]}
          </p>
          {isDaily && (
            <>
              <p>Period: {task.period}</p>
              <p>Gap: {task.gap}</p>
            </>
          )}
          <p>Difficulty: {task.difficulty}</p>
          <p>Participants: {task.participants.join(", ")}</p>
        </div>
        <Button onClick={() => handleEditTask(task)}>
          Edit {isDaily ? "daily" : "to-do"}
        </Button>
      </div>
    ));
  }

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col gap-8">
      <p className="text-dark text-2xl font-bold">
        Group {isDaily ? "dailies" : "to-dos"}
      </p>
      {getTaskList()}
    </div>
  );
}

export async function loader({ request, params }) {
  return axiosInstance
    .get(`/group/${params.type}?groupId=${params.groupId}`)
    .then((response) => {
      return response.data.taskDataList;
    })
    .catch((err) => {
      console.log(err);

      return Promise.resolve();
    });
}
