"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerClass = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
class ServerClass {
    constructor() {
        this.run();
    }
    run() {
        try {
            dotenv_1.default.config();
            const server = (0, express_1.default)();
            const port = process.env.SERVER_PORT;
            server.use((0, cors_1.default)());
            server.use(body_parser_1.default.json());
            server.listen(port);
            console.log("[SERVER][ServerClass.run] Server listening on port: ", port);
            return server;
        }
        catch (err) {
            console.error("[SERVER][ServerClass.run] ERROR: ", err);
            return null;
        }
    }
}
exports.ServerClass = ServerClass;
//# sourceMappingURL=ServerClass.js.map