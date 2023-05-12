import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoMangerClass } from "./MongoManagerClass";
import { bindAuthRoutes } from '../router/routes/auth';
import passport from '../passport';
import sessionMiddleware,{ensureAuthenticated} from '../router/middlewares/session';


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
        const sessionMDL = sessionMiddleware(this.mdb.mongoStore)
        this.server.use(sessionMDL);
       // this.server.use(ensureAuthenticated)
        console.log("[serverClass.setMiddlewares] SUCCESS");
    }
        
        
    public setRoutes(){
        
        bindAuthRoutes(this.server,this.mdb);
        

        // Error handling middleware
        this.server.use((err: any, req: Request, res: Response, next: NextFunction) => {
            res.status(500).json({ error: err.message });
        });
        
        console.log("[serverClass.setRoutes] SUCCESS");

    }
    
    public async init() {
        
        try {
            dotenv.config();
            const server : Express = express();
            const port : string = process.env.SERVER_PORT;
            
            server.use(cors());
            server.use(bodyParser.json());

                
            this.server = server;

            this.setMiddlewares();
            this.setRoutes();
            
            this.server.use(passport.initialize());
            this.server.use(passport.session());


            


            
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
        if(!this.mdb) return null;
        return await this.init();
    }
        
}
    
