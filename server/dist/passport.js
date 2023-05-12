"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const passport_google_oauth2_1 = require("passport-google-oauth2");
const passport_local_1 = require("passport-local");
const databaseModels_1 = require("./databaseModels");
// Passport configuration
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: 'YOUR_FACEBOOK_APP_ID',
    clientSecret: 'YOUR_FACEBOOK_APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Facebook authentication logic
    // Check if the user exists in your database and create a session
    // Call the `done` callback with the user object
}));
passport_1.default.use(new passport_google_oauth2_1.Strategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Google authentication logic
    // Check if the user exists in your database and create a session
    // Call the `done` callback with the user object
}));
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email", passwordField: "password" }, (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield databaseModels_1.UserModel.findOne({ email });
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
})));
passport_1.default.serializeUser((user, done) => {
    // Serialize the user object
    done;
});
passport_1.default.deserializeUser((id, done) => {
    // Deserialize the user object
    // Retrieve the user from the database using the provided `id`
    let user = null;
    done(null, user);
});
console.log("[passport] STRATEGY CONFIGURATED");
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map