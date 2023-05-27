import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { IUser, UserModel } from "../../databaseModels";
import { ApiReturn } from '../../types';
import { MongoMangerClass } from '../../lib/MongoManagerClass';
import { insertUser } from '../../models/userModel';


async function loginHelper(req: any) : Promise<ApiReturn> {
    const { email, password } = req.body;
    
    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });
        
        // If the user does not exist, respond with an error
        if (!user) {
            return {result: false, code:400, message: 'User not found' };
        }
        
        // Compare the provided password with the stored password
        const isMatch : boolean = await bcrypt.compare(password, user.password);
        
        // If the passwords do not match, respond with an error
        if (!isMatch) {
            return {result: false, code:400,  message: 'Invalid credentials' };
        }
        
        // Create the payload for the JWT
        const payload = {
            sub: user._id,
            email: user.email,
        };
        
        // Sign the JWT with the secret key and set an expiration time
        const token: string = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
        
        // Send the token as the response
        return {result: true, code: 200,  message: 'Ok', data: token };
    }
    catch(err){
        console.error("[auth.loginHandler] ERROR: ", err);
        return {result: false, code:500,  message: err.message };
    }
}


async function hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10); 
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword
}


async function registerHelper(req: any, res: any, db: MongoMangerClass): Promise<ApiReturn>{
    console.log("[routes.auth.bindAuthRoutes] ROURTE -> /regiter");
    
    let userInserted : ApiReturn = {result: false, message: "Signup Failed", code: 500 };
    
    try {
        const user: IUser = req.body;
        
        if(!user || Object.keys(user).length === 0 ) {
            res.statusCode = 409;
            res.statusMessage = "REQUEST_FOR_EMPTY_USER";
            userInserted.message = "Missing data";
            return userInserted;
        }
        
        user.password = await hashPassword(user.password);

        user.roleID = 'user';
        
        userInserted = await insertUser(user);
    }
    catch(err){
        console.error("[auth.registerHelper] ERROR: ", err)
        userInserted = {result: false, message: "Signup Failed", code: 500 };
    }
    
    return userInserted; 
}


export async function tokenValidationHandler(req: any): Promise<ApiReturn> {
    const ret : ApiReturn = {
        result: true,
        message: "ok",
        code: 200
    }
    return ret;
    
}

export async function registrationHandler (req: any,res: any, db: MongoMangerClass) {
    const regRes : ApiReturn = await registerHelper(req, res, db);
    res.json(regRes)
}

export async function loginHandler (req: any, res: any){
    const logRes: ApiReturn = await loginHelper(req); 
    res.json(logRes);
}

export async function validateHandler (req: any,res: any) {
    let response : ApiReturn = {
        result: false,
        message: 'Token Validation Error',
        code: 500
    }
    try{
        response = await tokenValidationHandler(req);
    }
    catch(err){
        console.error("[auth.validateHandler] ERROR: ", err);
    }

    res.json(response);
}


export async function logoutHandler(req, res) {
    const response : ApiReturn = {
        result: false,
        message: 'Error on logout',
        code: 500
    }
    try{
        response.result = true;
        response.message = 'Logout success'
        response.code = 200;
    }
    catch(err){
        console.error("[auth.validateHandler] ERROR: ", err);
    }

    res.json(response);
}



