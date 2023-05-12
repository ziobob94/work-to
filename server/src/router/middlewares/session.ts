import session from 'express-session';
import crypto from 'crypto';

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

export function ensureAuthenticated(req: any, res: any, next: any) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

const sessionMiddleware = (store: any) =>{
try {
    const res = session({
        secret: generateSecretKey(),
        resave: false,
        saveUninitialized: true,
        store: store,
        cookie: { secure: false, maxAge: parseInt(process.env.SESSION_DURATION) }
        // Set secure: true if using HTTPS
    })
    console.log("[routes.auth.bindAuthRoutes] SUCCESS");
    return res;
        
    }
    catch(err){
        console.error("[routes.auth.bindAuthRoutes] ERROR: ", err);
        return null;
    }    
}

export default sessionMiddleware;