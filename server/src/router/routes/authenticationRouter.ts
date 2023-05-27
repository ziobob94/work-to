// import passport from "../../passport";
import express, { Router } from "express";
import dotenv from 'dotenv';
import passport from "passport";
import { mdb } from "../../lib/Server";
import { registrationHandler, loginHandler, validateHandler, logoutHandler } from "../../controllers/main/authenticationController";
dotenv.config();


const autheticationRouter: Router = express.Router();

autheticationRouter.post('/login',
    loginHandler
);


autheticationRouter.get('/logout', 
    logoutHandler
);



autheticationRouter.post('/register', 
    (req, res) => {
        registrationHandler(req,res,mdb)
    }
);


autheticationRouter.get('/validate-token', 
    passport.authenticate('jwt', {session: false}),
    validateHandler
)

export default autheticationRouter;

/* export function bindAuthenticationRoutes(app: Express, db: MongoMangerClass) {
    
    try {  */   
        
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
 /*        
        app.post('/login',
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
    
} */

