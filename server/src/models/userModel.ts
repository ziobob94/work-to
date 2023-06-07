import { ApiReturn, IUser } from "../types";
import * as messages from "../messages.json"

import mongoose, { Schema } from 'mongoose';


const userSchema = new Schema<IUser>({
  first: {
    type: String,
    required: false,
    trim: false,
  },
  last: {
    type: String,
    required: false,
    trim: false,
  },
  termsAccepted:{
    type: Boolean,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value: string) {
        // Regular expression to validate email format
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,}$/;
        const test = emailRegex.test(value);
        return test;
      },
      message: 'Please provide a valid email address',
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [4, 'Username must be at least 4 characters'],
    maxlength: [20, 'Username cannot exceed 20 characters'],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: function (password: string) {
        const lengthRegex = /^.{8,}$/;
        const uppercaseRegex = /^(?=.*[A-Z])/;
        const lowercaseRegex = /^(?=.*[a-z])/;
        const symbolRegex = /^(?=.*[!@#$%^&*])/;
        const numberRegex = /^(?=.*\d)/;
      
        // Check each rule using the test method
        const isLengthValid = lengthRegex.test(password);
        const hasUppercase = uppercaseRegex.test(password);
        const hasLowercase = lowercaseRegex.test(password);
        const hasSymbol = symbolRegex.test(password);
        const hasNumber = numberRegex.test(password);
      
        // Return true if all rules pass, false otherwise
        return (
          isLengthValid && hasUppercase && hasLowercase && hasSymbol && hasNumber
        );
      },
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number',
    },
  },
  roleID: {
    type: String,
    required: true,
    trim: false,
  }
}, {timestamps: true} );

userSchema.index({email: 1}, {unique: true});

export const UserModel = mongoose.model<IUser>('User', userSchema);




export async function insertUser(user: any) : Promise<ApiReturn> {

    try {
        const created = await UserModel.create(user);
        if (created) {
            console.log('User created successfully:', user);
            return {result: true, message: messages["50000"], code: 200, data: created};
        }
        else return {result: false, message: messages["50002"], code: 401};
    }
    
    catch(error: any) {
        console.error('Error creating user:', error);
        return {result: false, message: messages["50003"], code: 500};
    }
}