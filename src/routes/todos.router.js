import { Router } from "express";
import { authToken } from "../utils.js";
import { createTask } from "../controller/task.controller.js";


const todosRouter = Router();

todosRouter.use(authToken)

todosRouter.get('/create', (req, res) => {
    res.send('Create todo');

})

todosRouter.post('/create', createTask)



export default todosRouter;