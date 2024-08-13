import { taskServices } from "../services/services.js"

export async function createTask(req, res) {
    try {
        const {title, description } = req.body
        if(!title) {
            return res.status(400).send({error: 'Title is required'})
        }
        const newTask = await taskServices.save({title, description})
        res.status(201).send(newTask)
    } catch (error) {
        console.error(error)
        return res.status(500).send({error: 'internal server error'})
    }
}