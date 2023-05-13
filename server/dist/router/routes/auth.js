"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindAuthRoutes = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("../controllers/auth");
const passport_1 = __importDefault(require("passport"));
dotenv_1.default.config();
function bindAuthRoutes(app, db) {
    try {
        app.post('/login', auth_1.loginHandler);
        app.get('/logout', auth_1.logoutHandler);
        app.post('/register', (req, res) => (0, auth_1.registrationHandler)(req, res, db));
        app.get('/validate-token', passport_1.default.authenticate('jwt', { session: false }), auth_1.validateHandler);
    }
    catch (err) {
        console.error("[routes.auth.bindAuthRoutes] ERROR: ", err);
    }
}
exports.bindAuthRoutes = bindAuthRoutes;
//# sourceMappingURL=auth.js.map