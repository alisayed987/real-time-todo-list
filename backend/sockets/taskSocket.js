const validate = require("../middlewares/validate");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validations/tasks.js");
const {
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../repositories/taskRepository.js");

const emitTasks = (io, tasks, message) => {
  io.emit("tasks", {
    success: true,
    message: message,
    tasks: tasks,
  });
}

const emitTasksError = (io, error) => {
  console.log(error);
  io.emit("tasks", {
    success: false,
    message: error.message,
  });
}

module.exports = function (io, sequelize) {
  io.on("connection", (socket) => {
    console.log("New client connected");
    const userId = socket.user.id;

    /**
     * Fetch user tasks
     */
    socket.on("fetchTasks", async () => {
      try {
        const tasks = await getUserTasks(userId, sequelize);
        emitTasks(io, tasks, "Fetched all tasks");
      } catch (error) {
        emitTasksError(io, error);
      }
    });

    /**
     * Add new task
     */
    socket.on("addTask", async (body) => {
      try {
        const { error } = createTaskSchema.validate(body);
        if (error) throw error;
        const task = await createTask(userId, body, sequelize);

        const tasks = await getUserTasks(userId, sequelize);
        emitTasks(io, tasks, `Created Task with id: ${task.id}`);
      } catch (error) {
        emitTasksError(io, error);
      }
    });

    /**
     * Update existing task
     */
    socket.on("updateTask", async (taskId, updatedTaskData) => {
      try {
        console.log(taskId, updatedTaskData);
        const { error } = updateTaskSchema.validate(updatedTaskData);
        if (error) throw error;
        await updateTask(taskId, userId, updatedTaskData, sequelize);

        const tasks = await getUserTasks(userId, sequelize);
        emitTasks(io, tasks, `updated task with id ${taskId}`);
      } catch (error) {
        emitTasksError(io, error);
      }
    });

    /**
     * Delete task
     */
    socket.on("deleteTask", async (taskId) => {
      try {
        await deleteTask(taskId, userId, sequelize);

        const tasks = await getUserTasks(userId, sequelize);
        emitTasks(io, tasks, `deleted task with id ${taskId}`);
      } catch (error) {
        emitTasksError(io, error)
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
