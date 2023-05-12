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
class MongoMangerClass {
    constructor() {
        this.mongoStore = null;
        this.connect()
            .then((res) => {
            return res;
        })
            .catch(() => {
            return null;
        });
    }
    validatePasswor(pwd) {
        return __awaiter(this, void 0, void 0, function* () {
        });
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
                    return { result: true, message: "User created successfully" };
                }
                else
                    return null;
            }
            catch (error) {
                console.error('Error creating user:', error);
                return { result: true, message: error.message };
            }
            ;
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                dotenv_1.default.config();
                // MongoDB connection
                const mongoURI = process.env.MDB_URI + "/" + process.env.MDB_DATABASE; // Replace with your MongoDB URI
                const db = yield mongoose_1.default.connect(mongoURI);
                this.mongoStore = connect_mongo_1.default.create({ mongoUrl: mongoURI });
                console.log("[MongoMangerClass.connect] DATABASE CONNECTION RESULT: ", !!db);
                return db;
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