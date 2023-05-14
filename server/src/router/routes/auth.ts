import { MongoMangerClass } from "../../classes/MongoManagerClass";
// import passport from "../../passport";
import { Express } from "express";
import dotenv from 'dotenv';
import { registrationHandler, loginHandler, validateHandler, logoutHandler } from "../controllers/auth";
import passport from "passport";
dotenv.config();




export function bindAuthRoutes(app: Express, db: MongoMangerClass) {
    
    try {    
        
        /*         app.get('/auth/facebook', passport.authenticate('facebook'));
        
        app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        }));
        
        app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
        
        app.get('/auth/google/callback', passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        }));
        */
        
        app.post('/login',
        /* passport.authenticate('jwt', {session: false}), */
            loginHandler
        );
        
        
        app.get('/logout', 
            logoutHandler
        );
        

        
        app.post('/register', 
                (req, res) => registrationHandler(req,res,db)
        );
        

        app.get('/validate-token', 
            passport.authenticate('jwt', {session: false}),
            validateHandler
        )
        
        
    }
    catch(err: any){
        console.error("[routes.auth.bindAuthRoutes] ERROR: ", err);
    }    
    
}
