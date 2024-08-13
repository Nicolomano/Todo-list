import mongoose from "mongoose";

const collection = "tasks";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: true
});

const taskModel = mongoose.model(collection, taskSchema);

export default taskModel;