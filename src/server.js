import express from 'express';
import mongoose from 'mongoose';
import MongodbSingleton from './config/mongodb-singleton.js';
import config from './config/config.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';


import usersRouter from './routes/users.router.js';
import todosRouter from './routes/todos.router.js';


import cookieParser from 'cookie-parser';
import initializePassport from './config/passport.config.js';
import passport from 'passport';



const app = express();
const PORT = 3000;
const URL_MONGO = config.mongoUrl;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser('secret'));

app.use(session({
    store:MongoStore.create({
        mongoUrl: URL_MONGO,
        mongoOptions: {useNewURLParser: true, useUnifiedTopology: true},
        ttl:10*600
    }),
    secret:"secret",
    resave: false,
    saveUninitialized: true
}))

const SERVER_PORT = config.port

initializePassport()
app.use(passport.initialize());
app.use(passport.session())

app.use('/api/users', usersRouter )
app.use('/api/todos', todosRouter)

//TODO use this key 8d4e8d134eb751e9d1ad47c7e10f2e5e

const httpServer = app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})


const connectMongoDB = async () =>{
    try {
        MongodbSingleton.getInstance()
    } catch (error) {
        console.error(error);
    }
}

connectMongoDB()