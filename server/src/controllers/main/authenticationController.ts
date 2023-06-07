import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { ApiReturn, IUser } from '../../types';
import { UserModel, insertUser } from '../../models/userModel';
import * as messages from "../../messages.json"
import { Request,Response } from "express";
import { getUserPermissions } from '../../models/permissionModel';



async function loginHelper(req: any) : Promise<ApiReturn> {
    const { email, password } = req.body;
    
    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });
        
        // If the user does not exist, respond with an error
        if (!user) {
            return {result: false, code:400, message: messages["50023"] };
        }
        
        // Compare the provided password with the stored password
        const isMatch : boolean = await bcrypt.compare(password, user.password);
        
        // If the passwords do not match, respond with an error
        if (!isMatch) {
            return {result: false, code:400,  message: messages["50024"] };
        }
        

        const permissions : ApiReturn = await getUserPermissions(user.roleID);

        if(!permissions.data) throw("Error: empty permissions");

        // Create the payload for the JWT
        const payload = {
            sub: user._id,
            _id: user._id,
            email: user.email,
            roleID: user.roleID,
            permissions: permissions.data
        };
        
        // Sign the JWT with the secret key and set an expiration time
        const token: string = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
        
        //let permissions = await getUserPermissions()
        
        // Send the token as the response
        return {result: true, code: 200,  message: 'Ok', data: token };
    }
    catch(err){
        console.error("[auth.loginCallback] ERROR: ", err);
        return {result: false, code:500,  message: messages["50023"]};
    }
}


async function hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10); 
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword
}


async function registerHelper(req: Request, res: Response): Promise<ApiReturn>{
    console.log("[routes.auth.bindAuthRoutes] ROURTE -> /regiter");
    
    let userInserted : ApiReturn = {result: false, message: messages["50003"], code: 500 };
    
    try {
        const user: IUser = req.body;
        
        if(!user || Object.keys(user).length === 0 ) {
            res.statusCode = 409;
            res.statusMessage = "REQUEST_FOR_EMPTY_USER";
            userInserted.message = messages["50010"];
            return userInserted;
        }
        
        user.password = await hashPassword(user.password);

        user.roleID = 'user';
        
        userInserted = await insertUser(user);
    }
    catch(err){
        console.error("[auth.registerHelper] ERROR: ", err)
        userInserted = {result: false, message: messages["50003"], code: 500 };
    }
    res.statusCode = userInserted.code;
    res.statusMessage = userInserted.message;
    return userInserted; 
}

export async function tokenValidationCallback(): Promise<ApiReturn> {
    const ret : ApiReturn = {
        result: true,
        message: "ok",
        code: 200
    }
    return ret;
}

export async function registrationCallback (req: Request,res: Response)  : Promise<Response<any, Record<string, any>>> {
    const regRes : ApiReturn = await registerHelper(req, res);
    res.statusCode = regRes.code;
    return res.json(regRes);
}

export async function loginCallback (req: Request, res: Response) : Promise<Response<any, Record<string, any>>>{
    const logRes: ApiReturn = await loginHelper(req); 
    if(logRes.result) res.set('Authorization', 'Bearer ' + logRes.data);
    // res.cookie('auth', logRes.data, { maxAge: 3600000, httpOnly: true });
    res.statusCode = logRes.code;
    res.statusMessage = logRes.message;
    return res.json(logRes);
}

export async function validateCallback (req: Request,res: Response) : Promise<Response<any, Record<string, any>>> {
    let response : ApiReturn = {
        result: false,
        message: 'Token Validation Error',
        code: 500
    }
    try{
        const isValid = await tokenValidationCallback();
        if(isValid.result && req.headers.authorization) {
            res.setHeader('Authorization', 'Bearer ' + req.headers.authorization.replace("Bearer ", ''));
            response = isValid;
        } 

    }
    catch(err){
        console.error("[auth.validateCallback] ERROR: ", err);
    }
    res.statusCode = response.code;
    res.statusMessage = response.message;
    return res.json(response);}


export async function logoutCallback(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> {
    const response : ApiReturn = {
        result: false,
        message: messages["50033"],
        code: 500
    }
    try{
        response.result = true;
        response.message = messages["50030"]
        response.code = 200;
    }
    catch(err){
        console.error("[auth.validateCallback] ERROR: ", err);
    }
    res.statusCode = response.code;
    res.statusMessage = response.message;
    return res.json(response);
}



