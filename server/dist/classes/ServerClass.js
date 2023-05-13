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
exports.ServerClass = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const MongoManagerClass_1 = require("./MongoManagerClass");
const auth_1 = require("../router/routes/auth");
const passport_1 = __importDefault(require("../passport/passport"));
class ServerClass {
    constructor() {
        this.mdb = new MongoManagerClass_1.MongoMangerClass();
        this.server = null;
        this.run()
            .then((result) => {
            return result;
        })
            .catch((err) => {
            console.error("[SERVER][ServerClass.constructor] ERROR: ", err);
        });
    }
    setMiddlewares() {
        console.log("[serverClass.setMiddlewares] SUCCESS");
    }
    setRoutes() {
        (0, auth_1.bindAuthRoutes)(this.server, this.mdb);
        this.server.use((err, req, res, next) => {
            res.status(500).json({ error: err.message });
        });
        console.log("[serverClass.setRoutes] SUCCESS");
    }
    initializeCors() {
        const corsOptions = {
            origin: JSON.parse(process.env.ALLOWED_HOSTS),
            methods: JSON.parse(process.env.METHODS),
            allowedHeaders: JSON.parse(process.env.ALLOWEDHEADERS),
            exposedHeaders: JSON.parse(process.env.EXPOSEDHEADERS),
            credentials: (process.env.CREDENTIALS === 'true'),
            maxAge: parseInt(process.env.MAXAGE)
        };
        return (0, cors_1.default)(corsOptions);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                dotenv_1.default.config();
                const server = (0, express_1.default)();
                const port = process.env.SERVER_PORT;
                const corsInstance = this.initializeCors();
                server.use(corsInstance);
                server.use(body_parser_1.default.json());
                this.server = server;
                this.server.use(passport_1.default.initialize());
                this.setMiddlewares();
                this.setRoutes();
                server.listen(port);
                console.log("[SERVER][ServerClass.run] Server listening on port: ", port);
                return server;
            }
            catch (err) {
                console.error("[SERVER][ServerClass.run] ERROR: ", err);
                return null;
            }
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.mdb)
                return null;
            return yield this.init();
        });
    }
}
exports.ServerClass = ServerClass;
//# sourceMappingURL=ServerClass.js.map