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
exports.MongoMangerClass = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const databaseModels_1 = require("../databaseModels");
const utils_1 = require("../utils");
class MongoMangerClass {
    constructor() {
        this.mongoStore = null;
        this.db = null;
    }
    insertUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                email: user.email,
                username: user.username,
                password: user.password,
            };
            try {
                const user = yield databaseModels_1.UserModel.create(newUser);
                if (user) {
                    console.log('User created successfully:', user);
                    return { result: true, message: "User created successfully", code: 200 };
                }
                else
                    return { result: false, message: "User creation failed", code: 401 };
            }
            catch (error) {
                console.error('Error creating user:', error);
                return { result: false, message: error.message, code: 401 };
            }
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                dotenv_1.default.config();
                const mongoURI = process.env.MDB_URI + "/" + process.env.MDB_DATABASE;
                while (!this.db) {
                    try {
                        console.log("[MongoManagerClass.connect] TRY TO CONNECTING TO MONGODB");
                        this.db = yield mongoose_1.default.connect(mongoURI);
                    }
                    catch (err) {
                        console.warn("[MongoManagerClass.connect] ERROR CONNECTING TO MONGODB: ", err.message);
                        this.db = null;
                        (0, utils_1.sleep)(5000);
                    }
                }
                this.mongoStore = connect_mongo_1.default.create({ mongoUrl: mongoURI });
                console.log("[MongoMangerClass.connect] DATABASE CONNECTION: ", !!this.db);
                return !!this.db;
            }
            catch (err) {
                console.error("[SERVER][ServerClass.run] ERROR: ", err);
                return null;
            }
        });
    }
}
exports.MongoMangerClass = MongoMangerClass;
//# sourceMappingURL=MongoManagerClass.js.map