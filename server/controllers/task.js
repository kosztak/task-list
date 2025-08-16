const Task = require("../models/task");
const Group = require("../models/group");

//GET
// gives back all data of the task
exports.getTaskData = (req, res, next) => {
  const taskId = req.query.taskId;

  Task.findById(taskId)
    .then((task) => {
      return res.status(200).json(task);
    })
    .catch((err) => {
      console.log(err);

      return res.status(500).json();
    });
};

//POST

//PATCH
// updates data of a user's task
exports.patchUserTask = (req, res, next) => {
  const { _id, ...task } = req.body;

  Task.findByIdAndUpdate(_id, { $set: task })
    .then(() => {
      return res.status(200).json();
    })
    .catch((err) => {
      console.log(err);

      return res.status(500).json({ message: "Couldn't update the task!" });
    });
};

// updates data of task of a group
exports.patchGroupTask = (req, res, next) => {
  const { taskData, groupData, isDaily } = req.body;
  const { id, ...collectedTaskData } = taskData; // get apart the id and the rest of the got task data

  Task.findById(id)
    .then((task) => {
      task
        .updateOne({ $set: collectedTaskData }) // update task in database
        .then(() => {
          return Group.findById(task.ownerId);
        })
        .then((group) => {
          const groupTask = isDaily // get the correct task entity from the group entity
            ? group.tasks.dailies.find((task) => task.taskId.toString() === id)
            : group.tasks.todos.find((task) => task.taskId.toString() === id);

          if (groupData.difficulty) {
            groupTask.difficulty = groupData.difficulty;
          }

          const participantList = groupData.participants.map((part) => {
            const partIndex = groupTask.participants.findIndex(
              (groupPart) => groupPart.userId.toString() === part,
            );

            return {
              userId: part,
              ...(partIndex !== -1
                ? { done: groupTask.participants.at(partIndex).done }
                : { done: false }),
            };
          });

          groupTask.participants = participantList;

          return group.save();
        })
        .then(() => {
          return res.status(200).json();
        });
    })
    .catch((err) => {
      console.log(err);

      return res.status(500).json({ message: "Couldn't update the task!" });
    });
};
