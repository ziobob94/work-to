
import { Strategy as LocalStrategy } from 'passport-local';

import { UserModel } from '../databaseModels';

export default new LocalStrategy({ usernameField: "email", passwordField: "password"}, async (email: string, password: string, cb) => {
    try {
      const user = await UserModel.findOne({ email });
      const isPasswordValid = (user?.password === password);
      
      if (!user || !isPasswordValid) {
        return cb(null,false); // User not found
      }
      return cb(null,user);
    } 
    catch (error) {
      console.error('Error retrieving user:', error);
      return cb(error);
    }
  })