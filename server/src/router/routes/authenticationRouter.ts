// import passport from "../../passport";
import express, { Router } from "express";
import dotenv from 'dotenv';
import passport from "passport";
import { mdb } from "../../lib/Server";
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
    (req, res) => {
        registrationCallback(req,res,mdb)
    }
);


autheticationRouter.get('/validate-token', 
    passport.authenticate('jwt', {session: false}),
    validateCallback
)

export default autheticationRouter;
