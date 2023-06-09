import { ApiReturn } from "./types";
import logger, {LoggerOpt} from "./logger";

const logOpt = LoggerOpt(__filename);

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(() => resolve, ms ))
}

export function normalizeResponse( res: any, data: ApiReturn, key: string ): { [key: string]: ApiReturn} {
    try{   
        let code = 500;
        if(data.result && !code) code = 200
        else if (!data.result && !code) code = 500
        else code = data.code;
        res.statusCode = code;
        res.statusMessage = (data.code !== 500) ? data.message : "Sever Error";
        return {[key]: data}
    }
    catch(err){
        logOpt.error = err;
        logOpt.message = err.message;
        logger.error(logOpt);
        return null;
    }
}


export function getCurrentStack() {
    const error = new Error();

    return error.stack;
  } 