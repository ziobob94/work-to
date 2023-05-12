import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value: string) {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
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
});


export const UserModel = mongoose.model<IUser>('User', userSchema);
