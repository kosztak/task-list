const jwt = require("jsonwebtoken");
const dateFns = require("date-fns");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const User = require("../models/user");
const Task = require("../models/task");
const Group = require("../models/group");

//GET
exports.getUserData = (req, res, next) => {
  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

  User.findById(decodedToken.id)
    .then((user) => {
      const responseData = {
        name: user.username,
        ...(user.image && { image: user.image }),
      };

      return res.status(200).json(responseData);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json();
    });
};

exports.getImage = (req, res, next) => {
  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

  User.findById(decodedToken.id)
    .then((user) => {
      return res.status(200).json({ image: user.image });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json();
    });
};

exports.getDailies = (req, res, next) => {
  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

  User.findById(decodedToken.id)
    .populate("tasks.dailies.taskId")
    .then((user) => {
      const daliesList = [...user.tasks.dailies];
      const transformedDailies = daliesList.map((task) => {
        return {
          _id: task.taskId._id,
          date: dateFns.subDays(task.taskId.date, 1),
          description: task.taskId.description,
          name: task.taskId.name,
          renewel: task.taskId.renewel,
          done: task.done,
        };
      });
      return res.status(200).json(transformedDailies);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json();
    });
};

exports.getTodos = (req, res, next) => {
  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

  User.findById(decodedToken.id)
    .populate("tasks.todos")
    .then((user) => {
      return res.status(200).json(user.tasks.todos);
    })
    .catch((err) => {
      console.log(err);

      return res.status(500).json();
    });
};

exports.getGroups = (req, res, next) => {
  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

  User.findById(decodedToken.id)
    .populate("owngroup")
    .populate("groups")
    .then((user) => {
      const owned = user.owngroup
        ? {
            id: user.owngroup._id,
            name: user.owngroup.name,
            dailies: user.owngroup.tasks.dailies.filter((task) => {
              return task.participants.some(
                (participant) =>
                  participant.userId.toString() === decodedToken.id &&
                  !participant.done,
              );
            }).length,
            todos: user.owngroup.tasks.todos.filter((task) => {
              return task.participants.some(
                (participant) =>
                  participant.userId.toString() === decodedToken.id &&
                  !participant.done,
              );
            }).length,
            ...(user.owngroup.image && { image: user.owngroup.image }),
          }
        : null;

      const others = user.groups.map((group) => {
        const dailies = group.tasks.dailies.filter((task) => {
          return task.participants.some(
            (participant) =>
              participant.userId.toString() === decodedToken.id &&
              !participant.done,
          );
        }).length;

        const todos = group.tasks.todos.filter((task) => {
          return task.participants.some(
            (participant) =>
              participant.userId.toString() === decodedToken.id &&
              !participant.done,
          );
        }).length;

        return {
          id: group._id,
          name: group.name,
          dailies,
          todos,
          ...(group.image && { image: group.image }),
        };
      });

      return res.status(200).json({ owned, others });
    })
    .catch((err) => {
      console.log(err);

      return res.status(500).json();
    });
};

exports.getHasGroup = (req, res, next) => {
  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

  User.findById(decodedToken.id)
    .then((user) => {
      if (!user.owngroup) {
        return res.status(200).json();
      }

      return res.status(500).json();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json();
    });
};

//POST
exports.postAddTask = (req, res, next) => {
  const { name, description, date, period, gap } = req.body;
  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

  const task = new Task({
    ownerId: decodedToken.id,
    ownerType: "User",
    name,
    date,
    description,
  });

  User.findById(decodedToken.id)
    .then((user) => {
      if (period) {
        task.renewel = {
          period,
          gap,
        };
        user.tasks.dailies.push({ taskId: task._id, done: true });
      } else {
        user.tasks.todos.push(task._id);
      }

      return user.save();
    })
    .then(() => {
      return task.save();
    })
    .then(() => {
      return res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json();
    });
};

exports.postCheckTodo = (req, res, next) => {
  const { taskId } = req.body;
  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

  User.findById(decodedToken.id)
    .then((user) => {
      if (!user) {
        return res.status(500).json();
      }

      user.tasks.todos = user.tasks.todos.filter(
        (task) => task.toString() !== taskId,
      );

      return user.save();
    })
    .then(() => {
      return Task.findByIdAndDelete(taskId);
    })
    .then(() => {
      return res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json();
    });
};

exports.postCheckDaily = (req, res, next) => {
  const { taskId } = req.body;

  Task.findById(taskId)
    .then((task) => {
      task.renewel.done = true;

      return task.save();
    })
    .then(() => {
      return res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json();
    });
};

exports.postJoinGroup = (req, res, next) => {
  const { name, password } = req.body;

  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

  Group.findOne({ name })
    .then((group) => {
      if (!group) {
        return res
          .status(500)
          .json({ message: "No group exists with given name!" });
      }
      return User.findById(decodedToken.id)
        .then((user) => {
          if (user.groups.includes(group._id.toString())) {
            return res
              .status(500)
              .json({ message: "You are already a member of this group!" });
          }
          return bcrypt.compare(password, group.password).then((doMatch) => {
            if (!doMatch) {
              return res
                .status(500)
                .json({ message: "The given password is incorrect!" });
            }

            group.members.push({
              userId: decodedToken.id,
              point: 0,
            });

            return group.save().then(() => {
              user.groups.push(group._id);
              return user.save();
            });
          });
        })
        .then(() => {
          return res.status(200).json({ groupId: group._id });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Couldn't join to group!" });
    });
};

//PATCH
// updates the given properties of a user
exports.patchInfo = async (req, res, next) => {
  const requestData = req.body;
  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

  if (requestData.password) {
    requestData.password = await bcrypt.hash(requestData.password, 12);
  }

  if (req.file) {
    const fileName =
      decodedToken.id + "." + req.file.originalname.split(".")[1];
    fs.writeFileSync(`./images/users/${fileName}`, req.file.buffer);
    requestData.image = fileName;
  }

  User.findByIdAndUpdate(decodedToken.id, { $set: requestData })
    .then(() => {
      return res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Couldn't update user data!" });
    });
};

//DELETE
exports.deleteTask = (req, res, next) => {
  const { taskId, isDaily } = req.query;
  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

  User.findById(decodedToken.id)
    .then((user) => {
      if (!user) {
        return res.status(500).json();
      }

      if (isDaily) {
        user.tasks.dailies = user.tasks.dailies.filter(
          (task) => task.taskId.toString() !== taskId,
        );
      } else {
        user.tasks.todos = user.tasks.todos.filter(
          (task) => task.toString() !== taskId,
        );
      }
      return user.save();
    })
    .then(() => {
      return Task.findByIdAndDelete(taskId);
    })
    .then(() => {
      return res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json();
    });
};
