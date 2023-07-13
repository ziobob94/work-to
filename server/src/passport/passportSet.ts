import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import jwtStategy from './jwtStategy';
import localStrategy from './localStrategy';
import facebookStrategy from './facebookStrategy';
import googleStrategy from './googleStrategy';
import logger, { LoggerOpt } from '../logger';
const logOpt = LoggerOpt(__filename);

// Passport configuration
passport.use( googleStrategy );
passport.use( facebookStrategy ); 
passport.use( localStrategy );
passport.use( jwtStategy );


passport.serializeUser<any, any>((user, done: any) => {
  // Serialize the user object
  logger.info("USER: ", user);
  done(null, user);
});

passport.deserializeUser<any, any>((id, done) => {
  // Deserialize the user object
  // Retrieve the user from the database using the provided `id`
  const user : any = null;
  done(null, user);
});


export default passport;