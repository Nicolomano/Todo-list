import taskModel from "../models/task.js";

class TaskDao {
    constructor(){
        console.log('task dao constructor');
    }
    getAll = async () => {
        let tasks = await taskModel.find();
        return tasks.map(task => task.toObject());  
    }
    save = async (task)=>{
        let result = await taskModel.create(task);
        return result;
    }
    findOne = async (id) =>{
        let result = await taskModel.findOne({_id:id});
        return result;
    }
    update = async (filter, value) =>{
        console.log('Update task with filter and value:');
        console.log(filter);
        console.log(value);
        let result = await taskModel.updateOne(filter, value);
        return result;
    }

}

export default TaskDao;