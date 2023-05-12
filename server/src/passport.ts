
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from './databaseModels';


// Passport configuration
passport.use(new FacebookStrategy({
    clientID: 'YOUR_FACEBOOK_APP_ID',
    clientSecret: 'YOUR_FACEBOOK_APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Facebook authentication logic
    // Check if the user exists in your database and create a session
    // Call the `done` callback with the user object
}));

passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Google authentication logic
    // Check if the user exists in your database and create a session
    // Call the `done` callback with the user object
})); 

passport.use(
    new LocalStrategy({ usernameField: "email", passwordField: "password"}, async (email: string, password: string) => {
            try {
              const user = await UserModel.findOne({ email });
              if (!user) {
                return null; // User not found
              }
          
              const isPasswordValid = (user.password === password);
              if (!isPasswordValid) {
                return null; // Invalid password
              }
          
              return user;
            } 
            catch (error) {
              console.error('Error retrieving user:', error);
              return null;
            }
    })
  );

passport.serializeUser<any, any>((user, done) => {
    // Serialize the user object
    done;
});

passport.deserializeUser<any, any>((id, done) => {
    // Deserialize the user object
    // Retrieve the user from the database using the provided `id`
    let user = null;
    done(null, user);
});


console.log("[passport] STRATEGY CONFIGURATED");


export default passport;