import  config  from './config.js'
import mongoose from 'mongoose'

export default class MongodbSingleton {
    static #instance;

    constructor(){
        this.#connectMongoDB()
    }

    static getInstance(){
        if(this.#instance){
            console.log('Instance already exists');
        }else{
            this.#instance = new MongodbSingleton()
        }
        return this.#instance
    }

    #connectMongoDB = async () =>{
        try {
            mongoose.connect(config.mongoUrl)
            console.log('MongoDB connected', config.mongoUrl);
        } catch (error) {
            console.error(error);
        }
    }

}