import {fileURLToPath} from 'url';
import {dirname} from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const comparePasswords = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}


export const PRIVATE_KEY = 'todo-app-secret-key'

export const generateJWToken = (payload) =>{
    return jwt.sign(payload, PRIVATE_KEY,{expiresIn: '1h'})
}

export const authToken = (req, res, next) =>{
    const authHeader = req.headers.authorization
    
    if(!authHeader){
        return res.status(401).send({error:'No token provided'})
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, PRIVATE_KEY, (err, credentials) =>{
        if(err){
            return res.status(403).send({error: 'Failed to authenticate token'})
        }
        req.user = credentials.user
        next()
})
}



export default __dirname;