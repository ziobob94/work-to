import express, { Router } from "express";
// import { checkPermission } from "../../middlewares/authorizationMiddleware";
import passport from "passport";
import { getUserPageDataCallback } from "../../controllers/user/userController";


const  userRouter: Router = express.Router();

/**
 * MIDDLEWARE
 */
userRouter.use("/user", passport.authenticate('jwt', {session: false}),
    (req: any, res, next) => {
        // logger.info("CIAO", req);

        if(req.isAuthenticated() && req.user.roleID === 'admin') return next();

        res.statusCode = 403;
        res.statusMessage = 'Unauthorized';

        return res.json(null); 
 
} );

userRouter.use("/user/:id/:page", getUserPageDataCallback)



export default userRouter;


