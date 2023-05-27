
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import { PermissionModel, UserModel } from '../databaseModels';
import { sleep } from '../utils';
import { ApiReturn } from '../types';


export class MongoMangerClass{
    
    mongoStore: any;
    db: mongoose.Mongoose;
    
    constructor(){
        this.mongoStore = null;
        this.db = null;
    }
    
    /*     public async validatePasswor(pwd){
        
    } */
    

    




    public async connect() : Promise<boolean> {
        
        try {
            dotenv.config();
            // MongoDB connection
            const mongoURI = process.env.MDB_URI + "/" + process.env.MDB_DATABASE  // Replace with your MongoDB URI
            
        
            while(!this.db){
                try{
                    console.log("[MongoManagerClass.connect] TRY TO CONNECTING TO MONGODB")
                    this.db = await mongoose.connect(mongoURI)
                }
                catch(err){
                    console.warn("[MongoManagerClass.connect] ERROR CONNECTING TO MONGODB: ", err.message);
                    this.db = null;
                    sleep(5000);
                }
            }
            
            this.mongoStore = MongoStore.create({ mongoUrl: mongoURI })
            
            console.log("[MongoMangerClass.connect] DATABASE CONNECTION: ", !!this.db);
            
            return !!this.db;
        }
        catch(err){
            console.error("[SERVER][ServerClass.run] ERROR: ", err);
            return null;
        }
        
    }
    
    
}