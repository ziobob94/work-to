"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
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
            validator: function (password) {
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
                return (isLengthValid && hasUppercase && hasLowercase && hasSymbol && hasNumber);
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number',
        },
    },
});
exports.UserModel = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=databaseModels.js.map