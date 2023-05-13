import { Strategy as GoogleStrategy } from 'passport-google-oauth2';


export default new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // Google authentication logic
    // Check if the user exists in your database and create a session
    // Call the `done` callback with the user object
  })