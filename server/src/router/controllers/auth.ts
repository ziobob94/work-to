import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { UserModel } from "../../databaseModels";
import { ApiReturn } from '../../types';
import { MongoMangerClass } from '../../classes/MongoManagerClass';
import { normalizeResponse } from '../../utils';


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


export async function loginHandler (req: any, res: any){
    const logRes: ApiReturn = await loginHelper(req); 
    const norm = normalizeResponse(res, logRes, "loggedUser");
    res.json(norm);
}





async function hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10); 
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword
}

async function registerHelper(req: any, res: any, db: MongoMangerClass): Promise<ApiReturn>{
    console.log("[routes.auth.bindAuthRoutes] ROURTE -> /regiter");
    
    let userInserted : ApiReturn = {"result": false, message: "Signup Failed" };
    
    const user: any = req.body;
    
    if(!user || !Object.keys(user).length) {
        res.statusCode = 409;
        res.statusMessage = "REQUEST_FOR_EMPTY_USER";
        userInserted.message = "Missing data"
        return res.send(userInserted);
    }
    
    user.password = await hashPassword(user.password);
    
    userInserted = await db.insertUser(user);
    
    return userInserted; 
}

export async function registrationHandler (req: any,res: any, db: MongoMangerClass) {
    const regRes : ApiReturn = await registerHelper(req, res, db);
    const norm = normalizeResponse(res, regRes, "registeredUser");
    res.json(norm)
}



async function tokenValidationHandler(req: any): Promise<ApiReturn> {
        const ret : ApiReturn = {
            result: true,
            message: "ok"
        }
        return ret;
}

export async function validateHandler (req: any,res: any) {
    const validatedRes : ApiReturn = await tokenValidationHandler(req);
    const norm = normalizeResponse(res, validatedRes, "validationToken");
    res.json(norm)
}





export async function logoutHandler(req, res) {
    req.logout();
    res.redirect('/');
}