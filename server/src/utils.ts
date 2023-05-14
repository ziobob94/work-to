import { ApiReturn } from "./types";

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
        console.error("[utils.normalizeResponse] ERROR: ", err);
        return null;
    }
}
