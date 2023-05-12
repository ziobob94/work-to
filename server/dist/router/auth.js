"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindAuthRoutes = void 0;
const passport_1 = __importDefault(require("passport"));
function bindAuthRoutes(app) {
    app.get('/auth/facebook', passport_1.default.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));
    app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile'] }));
    app.get('/auth/google/callback', passport_1.default.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));
    app.get('/login', (req, res) => {
        return res.send('Login Page');
    });
    app.post('/login', passport_1.default.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));
    app.get('/profile', (req, res) => {
        res.send('Profile Page');
    });
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
}
exports.bindAuthRoutes = bindAuthRoutes;
//# sourceMappingURL=auth.js.map