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
import compression from 'compression';
import userRouter from '../router/routes/userRouter';
import logger, { LoggerOpt } from '../logger';

const logOpt = LoggerOpt(__filename);

const mdb : MongoMangerClass = new MongoMangerClass();

let server: Express = express();

function  setDefautlHeaders (req: Request, res: Response, next) {
    res.setHeader('Cache-Control', 'max-age=36000');
    next();
}

function setRouter(){

    server.use("/", autheticationRouter);
    server.use("/", adminRouter);
    server.use("/", userRouter);

    // Error handling middleware
    server.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(500).json({ error: err.message });
    });
    
    logger.info("SUCCESS", process.env.MODE );

    if(process.env.MODE === "production" ) {
        const p = process.env.CLIENT_INDEX_PATH;
        const a = path.resolve(p);
        server.use(express.static(p));
        server.get('*', (req: Request, res: Response) => {
            res.sendFile(path.join(p, 'index.html'));
          });
          
        // server.get("/", (req,res) => res.sendFile(a)); // Replace 'index.html' with the path to your web page file
    }

    
}
    

function initializeCors() {

    //logger.info(process.env)
    
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
        app.use(compression())

        app.use(bodyParser.json());
        
        server = app;

        server.use(passport.initialize());            
        
        //server.use(setDefautlHeaders);

        setRouter();
        
        server.listen(port);
        
        logOpt.message = `Server listening on port: ${port}`;
        logOpt.scope = 'init'
        logger.info(logOpt);

        
        return server;
    }
    catch(err){
        logOpt.message = err.message;
        logOpt.error = err;
        logOpt.scope = 'init';
        logger.error(logOpt);
        return null;
    }
    
}

async function run () {
    const connected: boolean = await mdb.connect();
    if(!connected) return null;
    return await init();
}


export {run, server, mdb};
