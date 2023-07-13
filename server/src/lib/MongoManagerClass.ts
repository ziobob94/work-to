
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import { sleep } from '../utils';
import logger from '../logger';



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
                    logger.info({file: __filename,  scope:'connect', message: 'CONNECTING TO MONGODB'});
                    this.db = await mongoose.connect(mongoURI)
                }
                catch(err){
                    logger.warn({file: __filename, scope:'connect', message: "ERROR CONNECTING TO MONGODB" + err.message, error: err } );
                    this.db = null;
                    sleep(5000);
                }
            }
            
            this.mongoStore = MongoStore.create({ mongoUrl: mongoURI })
            
            logger.info("DATABASE CONNECTION: ", !!this.db);
            
            return !!this.db;
        }
        catch(err){
            logger.error({file: __filename, scope:'connect', message: "ERROR CONNECTING TO MONGODB" + err.message, error: err } );
            return null;
        }
        
    }
    
    
}