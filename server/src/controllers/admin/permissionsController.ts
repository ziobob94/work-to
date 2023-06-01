import { ApiReturn, PermissionReq, IPermission, IRole } from "../../types";
import { getAllPermission, insertPermission, deletePermission, updatePermission } from "../../models/permissionModel";
import * as _ from 'lodash';

export async function createPermissions( req: any, res: any): Promise<ApiReturn>{
    console.log("[routes.auth.bindAuthRoutes] ROURTE -> /regiter");
    
    let permissionCreated : ApiReturn = {result: false, message: "Signup Failed", code: 500 };
    
    try {
        const perms: PermissionReq[] = req.body;
        
        if(!perms || Object.keys(perms).length === 0 ) {
            res.statusCode = 409;
            res.statusMessage = "REQUEST_FOR_EMPTY_USER";
            permissionCreated.message = "Missing data";
            return permissionCreated;
        }
        
        permissionCreated = await createHandler(perms);
    }
    catch(err){
        console.error("[auth.registerHandler] ERROR: ", err)
        permissionCreated = {result: false, message: "Signup Failed", code: 500 };
    }
    
    return res.json(permissionCreated); 
}

 async function createHandler (permissions: PermissionReq[]): Promise<ApiReturn>{
    const resp : ApiReturn = {
        result: false,
        message: "",
        code: 50001
    }

    if(permissions?.length > 0) {
        const len: number = permissions.length;
        let perm : PermissionReq = null;
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

export async function getAllPermissionsCallback(req, res){
    let resp : ApiReturn = {
        result: false,
        message: "Read all permission ",
        code: 50002
    }
    resp = await getAllPermission();

    return res.json(resp); 

}

export async function readPermissions(permissionsSlugs: string[], roleID = ""){
    const resp : ApiReturn = {
        result: false,
        message: "Read permission ",
        code: 50003
    }
    return resp;
}


export async function updatePermissionCallback( req: any, res: any): Promise<ApiReturn>{
    console.log("[routes.auth.bindAuthRoutes] ROURTE -> /regiter");
    
    let permissionUpdated : ApiReturn = {result: false, message: "Signup Failed", code: 500 };
    
    try {
        const perms: IPermission[] = req.body;
        
        if(!perms || Object.keys(perms).length === 0 ) {
            res.statusCode = 409;
            res.statusMessage = "REQUEST_FOR_EMPTY_USER";
            permissionUpdated.message = "Missing data";
        }
        else permissionUpdated = await updatePermissionHandler(perms);
    }
    catch(err){
        console.error("[auth.registerHandler] ERROR: ", err)
        permissionUpdated = {result: false, message: "Signup Failed", code: 500 };
    }
    
    return res.json(permissionUpdated); 
}

 async function updatePermissionHandler (permissions: IPermission[]): Promise<ApiReturn>{
    const resp : ApiReturn = {
        result: false,
        message: "Creation permission ",
        code: 50001
    }

    if(permissions?.length > 0) {
        const len: number = permissions.length;
        let perm : IPermission = null;
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


export async function deletePermissionCallback(req, res){
    let resp : ApiReturn = {
        result: false,
        message: "Delete permission ",
        code: 50005
    }

    const id = req.params.id;

    
    resp = await deletePermission(id);
    
    return res.json(resp); 

}



