import { ApiReturn } from "./types";

export function normalizeResponse( res: any, data: ApiReturn, key: string ): { [key: string]: ApiReturn} {
    res.statusCode = data.code;
    res.statusMessage = (data.code !== 500) ? data.message : "Sever Error";
    return {[key]: data}
}
