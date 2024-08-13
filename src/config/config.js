import dotenv from 'dotenv';
import program from './process.js'

const environment = program.opts().mode 

dotenv.config({
    path: environment === 'production' ? './src/config/.env.production' : './src/config/.env.development'
})

export default {
    port:process.env.SERVER_PORT,
    mongoUrl: process.env.MONGO_URL,
    environment: environment
}