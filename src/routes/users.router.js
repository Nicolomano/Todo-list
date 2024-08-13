import { Router } from "express";
import passport from "passport";
import { loginUser, registerUser } from "../controller/users.controller.js";

const usersRouter = Router();

usersRouter.get('/hello', (req, res) =>{
    res.send('Hello from users router');
})

usersRouter.post('/register', passport.authenticate('register',{failureRedirect:'/api/users/fail-register'}), registerUser )

usersRouter.post('/login', passport.authenticate('login',{failureRedirect:'/api/users/fail-login'}), loginUser)

usersRouter.get('/fail-register',(req,res)=>{
    res.status(401).send({error:'Failed to process register!'})
})

usersRouter.get('/fail-login',(req,res)=>{
    res.status(401).send({error:'Failed to process login!'})
})

export default usersRouter;