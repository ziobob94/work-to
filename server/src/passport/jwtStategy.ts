
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import dotenv from 'dotenv';
import { UserModel } from '../models/userModel';
dotenv.config();


const secretOrKey = process.env.SECRET_KEY;

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey
};


async function jwtStrategyHandler(payload, done) {
  try {

    if (payload.expiresAt < Date.now()) {
      // Token has expired
      return done(null, false, { message: 'Token expired' });
    }

    // Find the user associated with the token
    const user = await UserModel.findOne({_id: payload.sub});    
    
    if (!user) {
      return done(null,false); // User not found
    }
    
    return done(null,user);

  }
   catch (err) {
    console.error("[passport.JwtStrategy] ERROR: ", err)
    return done(err, false);
  }
}

export default new JwtStrategy( jwtOptions, jwtStrategyHandler )