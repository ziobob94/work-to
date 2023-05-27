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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const passport_google_oauth2_1 = require("passport-google-oauth2");
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const databaseModels_1 = require("./databaseModels");
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: 'YOUR_FACEBOOK_APP_ID',
    clientSecret: 'YOUR_FACEBOOK_APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
}));
passport_1.default.use(new passport_google_oauth2_1.Strategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
}));
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email", passwordField: "password" }, (email, password, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield databaseModels_1.UserModel.findOne({ email });
        const isPasswordValid = ((user === null || user === void 0 ? void 0 : user.password) === password);
        if (!user || !isPasswordValid) {
            return cb(null, false);
        }
        return cb(null, user);
    }
    catch (error) {
        console.error('Error retrieving user:', error);
        return cb(error);
    }
})));
passport_1.default.serializeUser((user, done) => {
    console.log("USER: ", user);
    done(null, user);
});
passport_1.default.deserializeUser((id, done) => {
    const user = null;
    done(null, user);
});
const secretOrKey = process.env.SECRET_KEY;
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey
};
passport_1.default.use(new passport_jwt_1.Strategy(jwtOptions, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (payload.expiresAt < Date.now()) {
            return done(null, false, { message: 'Token expired' });
        }
        const user = yield databaseModels_1.UserModel.findOne({ _id: payload.sub });
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (err) {
        console.error("[passport.JwtStrategy] ERROR: ", err);
        return done(err, false);
    }
})));
console.log("[passport] CONFIGURE STRATEGIES DONE ");
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map