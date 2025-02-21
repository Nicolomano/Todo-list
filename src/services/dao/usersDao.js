import userModel from '../models/users.js'

export default class UserServices {
    constructor(){
        console.log('Calling users model using a service');
    }
    getAll = async () =>{
        let users = await userModel.find()
        return users.map(user=>user.toObject())
        
    }
    save = async (user) =>{
        let result = await userModel.create(user)
        return result
        
    }
    findOne = async (username) =>{
        let result = await userModel.findOne({email:username})
        return result
        
    }
    update = async (filter, value) =>{
        console.log('Update user with filter and value:');
        console.log(filter);
        console.log(value);
        let result = await userModel.UpdateOne(filter, value)
        return result
        
    }
}