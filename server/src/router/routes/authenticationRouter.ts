// import passport from "../../passport";
import express, { Router, Request, Response } from "express";
import dotenv from 'dotenv';
import passport from "passport";
import { registrationCallback, loginCallback, validateCallback, logoutCallback } from "../../controllers/main/authenticationController";
dotenv.config();


const autheticationRouter: Router = express.Router();

autheticationRouter.post('/login',
    loginCallback
);


autheticationRouter.get('/logout', 
    logoutCallback
);



autheticationRouter.post('/register', 
    registrationCallback
);


autheticationRouter.get('/validate-token', 
    passport.authenticate('jwt', {session: false}),
    validateCallback
)

export default autheticationRouter;
