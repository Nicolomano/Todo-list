import { generateJWToken, comparePasswords } from "../utils.js";
import { userServices } from "../services/services.js";


export async function registerUser(req, res){
    res.status(201).send({status:'success',message:'Register user'});
}

export async function loginUser(req,res){
    const {email, password} = req.body;
    try {
        const user = await userServices.findOne(email);
        if(!user){
            return res.status(401).send({error:'User not found'});
        }
        if(!comparePasswords(user, password)){
            return res.status(401).send({error:'Invalid credentials'});
        }
        const tokenUser= {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
        }

        const access_token = generateJWToken(tokenUser)
        console.log(access_token);
        res.cookie('jwtCookieToken',access_token,
            {
                maxAge:60000,
                httpOnly: true
            }
        
        )
        res.send({message: 'Login success!!', access_token: access_token})
    } catch (error) {
        console.error(error);
        return res.status(500).send({status:'error', error:'Error interno de la aplicacion'})
    }
}