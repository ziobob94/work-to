
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import { UserModel } from '../databaseModels';


export class MongoMangerClass{
    
    mongoStore: any;
    
    constructor(){
        this.mongoStore = null;
        this.connect()
        .then((res) => {
            return res;
        })
        .catch(() => {
            return null;
        })
    }
    
    public async validatePasswor(pwd){
        
    }

    public async insertUser(user){
        const newUser = {
            email: user.email,
            username: user.username,
            password: user.password,
        };
        try {
            const user = await UserModel.create(newUser);
            if (user) {
                console.log('User created successfully:', user);
                return {result: true, message: "User created successfully"};
            }
            else return null;
        }
        
        catch(error: any) {
            console.error('Error creating user:', error);
            return {result: true, message: error.message};
        };
    }
    
    public async connect() {
        
        try {
            dotenv.config();
            // MongoDB connection
            const mongoURI = process.env.MDB_URI + "/" + process.env.MDB_DATABASE  // Replace with your MongoDB URI
            
            const db : mongoose.Mongoose = await mongoose.connect(mongoURI);
            
            this.mongoStore = MongoStore.create({ mongoUrl: mongoURI })
            
            console.log("[MongoMangerClass.connect] DATABASE CONNECTION RESULT: ", !!db);
            
            return db;
        }
        catch(err){
            console.error("[SERVER][ServerClass.run] ERROR: ", err);
            return null;
        }
        
    }
    
}