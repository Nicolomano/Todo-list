import UserServices from "./dao/usersDao.js";
import TaskDao from "./dao/task-dao.js";


import UserRepository from "./repository/user.repository.js";
import TaskRepository from "./repository/task.repository.js";


const userDAO = new UserServices();
const taskDAO = new TaskDao();

export const userServices = new UserRepository(userDAO);
export const taskServices = new TaskRepository(taskDAO);