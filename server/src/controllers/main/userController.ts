
import { Request,Response } from "express";

export async function getUserPageDataCallback(req: Request, res: Response)  : Promise<Response<any, Record<string, any>>>  {
    const data = null;
    const usrID = req.params.id;
    const page = req.params.page;
    
    return res.json(data);
}