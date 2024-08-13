import mongoose from "mongoose";

const collection = "users";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks"
    }]
}, 
{
    timestamps: true
});
const userModel = mongoose.model(collection, userSchema);

export default userModel;