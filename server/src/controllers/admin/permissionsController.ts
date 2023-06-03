import { Request, Response } from 'express';
import { ApiReturn, PermissionAPI, IPermission, IRole } from "../../types";
import { getAllPermission, insertPermission, deletePermission, updatePermission } from "../../models/permissionModel";
import * as _ from 'lodash';

export async function createPermissions( req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
    console.log("[routes.auth.bindAuthRoutes] ROURTE -> /regiter");
    
    let permissionCreated : ApiReturn = {result: false, message: "Signup Failed", code: 500 };
    
    try {
        const perms: PermissionAPI[] = req.body;
        
        if(!perms || Object.keys(perms).length === 0 ) {
            res.statusCode = 409;
            res.statusMessage = "REQUEST_FOR_EMPTY_USER";
            permissionCreated.message = "Missing data";
            return res.json(permissionCreated);
        }
        
        permissionCreated = await createHandler(perms);
    }
    catch(err){
        console.error("[auth.registerHandler] ERROR: ", err)
        permissionCreated = {result: false, message: "Signup Failed", code: 500 };
    }
    
    return res.json(permissionCreated); 
}

 async function createHandler (permissions: PermissionAPI[]): Promise<ApiReturn>{
    const resp : ApiReturn = {
        result: false,
        message: "",
        code: 50001
    }

    if(permissions?.length > 0) {
        const len: number = permissions.length;
        let perm : PermissionAPI = null;
        for(let i = 0; i < len; i++){
            perm = permissions[i];

            if(perm.rolesIDS.length < 1) return resp;

            const roles: IRole[] = perm.rolesIDS;

            for(let j = 0; j <  roles.length; j++) {

                const ins: any = _.clone(perm);

                delete ins.rolesIDS;

                ins.roleID = roles[j].role;

                await insertPermission(ins);
            }

        }
        resp.result = true;
        resp.message += 'success';
        resp.code = 200;
    }
    
    return resp;
}

export async function getAllPermissionsCallback(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> {
    let resp : ApiReturn = {
        result: false,
        message: "Read all permission ",
        code: 50002
    }
    resp = await getAllPermission();

    return res.json(resp); 

}

export async function readPermissions(permissionsSlugs: string[], roleID = ""): Promise<ApiReturn> {
    const resp : ApiReturn = {
        result: false,
        message: "Read permission ",
        code: 50003
    }
    return resp;
}


export async function updatePermissionCallback( req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
    console.log("[routes.auth.bindAuthRoutes] ROURTE -> /permission");
    
    let permissionUpdated : ApiReturn = {result: false, message: "Signup Failed", code: 500 };
    
    try {
        const perms: PermissionAPI[] = req.body;
        
        if(!perms || Object.keys(perms).length === 0 ) {
            res.statusCode = 409;
            res.statusMessage = "REQUEST_FOR_EMPTY_USER";
            permissionUpdated.message = "Missing data";
            return res.json(permissionUpdated);
        }
        else permissionUpdated = await updatePermissionHandler(perms);
    }
    catch(err){
        console.error("[auth.registerHandler] ERROR: ", err)
        permissionUpdated = {result: false, message: "Signup Failed", code: 500 };
    }
    
    return res.json(permissionUpdated); 
}

 async function updatePermissionHandler (permissions: PermissionAPI[]): Promise<ApiReturn>{
    const resp : ApiReturn = {
        result: false,
        message: "Creation permission ",
        code: 50001
    }

    if(permissions?.length > 0) {
        const len: number = permissions.length;
        let perm : PermissionAPI = null;
        for(let i = 0; i < len; i++){
            perm = permissions[i];
            await updatePermission(perm);
        }
        resp.result = true;
        resp.message += 'success';
        resp.code = 200;
    }
    
    return resp;
}


export async function deletePermissionCallback(req: Request, res: Response) : Promise<Response<any, Record<string, any>>>{
    const resp : ApiReturn = {
        result: false,
        message: "Delete permission ",
        code: 50005
    }

    const perms : PermissionAPI[] = req.body;
    let r = null;
    const notSaved : PermissionAPI[] = [];
    
    perms.forEach(async (perm) => {
        r = await deletePermission(perm);
        if(!r.result) notSaved.push(perm)
    })
    
    resp.result = true;
    resp.message = (notSaved.length > 0 ) ? "Deleted with errors" : "Delelte success";
    resp.code = (notSaved.length > 0 ) ? 200 : 202;
    return res.json(resp); 

}



