
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/userModel';
import logger from '../logger';

export default new LocalStrategy(
  { usernameField: "email", passwordField: "password"}, 
  async (email: string, password: string, cb) => {
    try {
      const user = await UserModel.findOne({ email });
      const isPasswordValid = (user?.password === password);
      
      if (!user || !isPasswordValid) {
        return cb(null,false); // User not found
      }
      return cb(null,user);
    } 
    catch (error) {
      logger.error('Error retrieving user:', error);
      return cb(error);
    }
  })