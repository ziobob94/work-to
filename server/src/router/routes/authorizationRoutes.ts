import { MongoMangerClass } from "../../lib/MongoManagerClass";
// import passport from "../../passport";
import { Express } from "express";
import dotenv from 'dotenv';
dotenv.config();


export function bindAuthorizationRoutes(app: Express, db: MongoMangerClass) {
    
    try {    

/*         app.get('/validate-token', 
            passport.authenticate('jwt', {session: false}),
            validateHandler
        ) */
        
    }
    catch(err: any){
        console.error("[routes.auth.bindAuthRoutes] ERROR: ", err);
    }    
    
}

