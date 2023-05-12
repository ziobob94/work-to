import { MongoMangerClass } from "../../classes/MongoManagerClass";
import passport from "../../passport";
import { Express } from "express";
import { ensureAuthenticated } from "../middlewares/session";

export function bindAuthRoutes(app: Express, db: MongoMangerClass) {
    
    try {    
        
        app.get('/auth/facebook', passport.authenticate('facebook'));
        
        app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        }));
        
        app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
        
        app.get('/auth/google/callback', passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        }));
        
        app.get('/login', (req: any, res: any) => {
            return res.send('Login Page');
        });
        
        app.post('/login', passport.authenticate('local', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true
          }));


        
        app.get('/logout', (req: any, res: any) => {
            req.logout();
            res.redirect('/');
        });
        
        
        
        app.post('/register', async (req, res, next) => {
            console.log("[routes.auth.bindAuthRoutes] ROURTE -> /regiter");
            const user = req.body;
            if(!user) {
                res.statusCode = 409;
                res.statusMessage = "REQUEST_FOR_EMPTY_USER";
                res.json({"result": false }).end();
            }
            const usrInserted = await db.insertUser(user)
            if(!user) {
                res.statusCode = 500;
                res.statusMessage = "USER_INSERTION_FAILED";
                res.json({"result": false }).end();
            }
            return res.json(usrInserted).end();
        });
        
        app.get('/', (req, res) => {
            // Access session data
            console.log('Username:', req.session);
            
            res.send('Home Page');
        });        
        
        app.get('/profile', ensureAuthenticated, (req, res) => {
            // Access session data
            console.log('Username:', req.session);
            
            res.send('Home Page');
        });
        
        
        
        
        console.log("[routes.auth.bindAuthRoutes] SUCCESS");
        
    }
    catch(err){
        console.error("[routes.auth.bindAuthRoutes] ERROR: ", err);
    }    
    
}
