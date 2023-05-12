"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const express_session_1 = __importDefault(require("express-session"));
const crypto_1 = __importDefault(require("crypto"));
const generateSecretKey = () => {
    return crypto_1.default.randomBytes(32).toString('hex');
};
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
exports.ensureAuthenticated = ensureAuthenticated;
const sessionMiddleware = (store) => {
    try {
        const res = (0, express_session_1.default)({
            secret: generateSecretKey(),
            resave: false,
            saveUninitialized: true,
            store: store,
            cookie: { secure: false, maxAge: parseInt(process.env.SESSION_DURATION) }
            // Set secure: true if using HTTPS
        });
        console.log("[routes.auth.bindAuthRoutes] SUCCESS");
        return res;
    }
    catch (err) {
        console.error("[routes.auth.bindAuthRoutes] ERROR: ", err);
        return null;
    }
};
exports.default = sessionMiddleware;
//# sourceMappingURL=session.js.map