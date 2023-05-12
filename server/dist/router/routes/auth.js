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
exports.bindAuthRoutes = void 0;
const passport_1 = __importDefault(require("../../passport"));
const session_1 = require("../middlewares/session");
function bindAuthRoutes(app, db) {
    try {
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
            failureRedirect: '/login',
            failureFlash: true
        }));
        app.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });
        app.post('/register', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("[routes.auth.bindAuthRoutes] ROURTE -> /regiter");
            const user = req.body;
            if (!user) {
                res.statusCode = 409;
                res.statusMessage = "REQUEST_FOR_EMPTY_USER";
                res.json({ "result": false }).end();
            }
            const usrInserted = yield db.insertUser(user);
            if (!user) {
                res.statusCode = 500;
                res.statusMessage = "USER_INSERTION_FAILED";
                res.json({ "result": false }).end();
            }
            return res.json(usrInserted).end();
        }));
        app.get('/', (req, res) => {
            // Access session data
            console.log('Username:', req.session);
            res.send('Home Page');
        });
        app.get('/profile', session_1.ensureAuthenticated, (req, res) => {
            // Access session data
            console.log('Username:', req.session);
            res.send('Home Page');
        });
        console.log("[routes.auth.bindAuthRoutes] SUCCESS");
    }
    catch (err) {
        console.error("[routes.auth.bindAuthRoutes] ERROR: ", err);
    }
}
exports.bindAuthRoutes = bindAuthRoutes;
//# sourceMappingURL=auth.js.map