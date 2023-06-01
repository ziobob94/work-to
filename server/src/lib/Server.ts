import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import { MongoMangerClass } from "./MongoManagerClass";
import passport from '../passport/passportSet';
import adminRouter from '../router/routes/adminRouter';
import autheticationRouter from '../router/routes/authenticationRouter';
dotenv.config();
import path from 'path';
/* 
export class ServerClass{
    
    mdb: MongoMangerClass;

    server: Express;
    
    constructor(){
        this.mdb = new MongoMangerClass();
        this.server = null;
        this.run()
        .then((result) =>{
            return result;
        })
        .catch((err) => {
            console.error("[SERVER][ServerClass.constructor] ERROR: ", err);
            
        })
        
    }
    
    
    public setMiddlewares(){
        // this.server.use(ensureAuthenticated)
        console.log("[serverClass.setMiddlewares] SUCCESS");
    }
    
    
    public setRoutes(){
        
        bindAuthenticationRoutes(this.server,this.mdb);
        bindAuthorizationRoutes(this.server,this.mdb);
        
        
        // Error handling middleware
        this.server.use((err: any, req: Request, res: Response, next: NextFunction) => {
            res.status(500).json({ error: err.message });
        });
        
        console.log("[serverClass.setRoutes] SUCCESS");
        
    }
    
    private initializeCors() {

        //console.log(process.env)
        
        const corsOptions : CorsOptions= {
            origin: JSON.parse(process.env.ALLOWED_HOSTS),
            methods: JSON.parse(process.env.METHODS) , 
            allowedHeaders: JSON.parse(process.env.ALLOWEDHEADERS) ,
            exposedHeaders: JSON.parse(process.env.EXPOSEDHEADERS) ,
            credentials: (process.env.CREDENTIALS === 'true') ,
            maxAge: parseInt(process.env.MAXAGE) 
        };

        return cors(corsOptions);
    }
    
    public async init() {
        
        try {
            dotenv.config();
            const server : Express = express();
            const port : string = process.env.SERVER_PORT;
            const corsInstance = this.initializeCors();

            server.use(corsInstance);

            server.use(bodyParser.json());
            
            this.server = server;

            this.server.use(passport.initialize());            
            
            this.setMiddlewares();

            this.setRoutes();
            
            server.listen(port);
            
            console.log("[SERVER][ServerClass.run] Server listening on port: ", port);
            
            return server;
        }
        catch(err){
            console.error("[SERVER][ServerClass.run] ERROR: ", err);
            return null;
        }
        
    }
    
    public async run () {
        const connected: boolean = await this.mdb.connect();
        if(connected) return null;
        return await this.init();
    }
    
}
 */


const mdb : MongoMangerClass = new MongoMangerClass();

let server: Express = express();

function setRouter(){
    

    server.use("/", autheticationRouter);
    server.use("/", adminRouter);

    // Error handling middleware
    server.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(500).json({ error: err.message });
    });
    
    console.log("[serverClass.setRoutes] SUCCESS", process.env.MODE );

    if(process.env.MODE === "production" ) {
        const p = process.env.CLIENT_INDEX_PATH;
        server.get("/", (req,res) => res.sendFile(path.resolve(p))); // Replace 'index.html' with the path to your web page file
    }

    
}
    

function initializeCors() {

    //console.log(process.env)
    
    const corsOptions : CorsOptions= {
        origin: JSON.parse(process.env.ALLOWED_HOSTS),
        methods: JSON.parse(process.env.METHODS) , 
        allowedHeaders: JSON.parse(process.env.ALLOWEDHEADERS) ,
        exposedHeaders: JSON.parse(process.env.EXPOSEDHEADERS) ,
        credentials: (process.env.CREDENTIALS === 'true') ,
        maxAge: parseInt(process.env.MAXAGE) 
    };

    return cors(corsOptions);
}

async function init() {
        
    try {
        dotenv.config();
        const app : Express = express();
        const port : string = process.env.SERVER_PORT;
        const corsInstance = initializeCors();

        app.use(corsInstance);

        app.use(bodyParser.json());
        
        server = app;

        server.use(passport.initialize());            
        
        setRouter();
        
        server.listen(port);
        
        console.log("[SERVER][ServerClass.run] Server listening on port: ", port);
        
        return server;
    }
    catch(err){
        console.error("[SERVER][ServerClass.run] ERROR: ", err);
        return null;
    }
    
}

async function run () {
    const connected: boolean = await mdb.connect();
    if(!connected) return null;
    return await init();
}


export {run, server, mdb};
