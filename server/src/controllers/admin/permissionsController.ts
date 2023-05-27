import { IPermission } from "../../databaseModels";
import { ApiReturn } from "../../types"
import { getAllPermission, insertPermission } from "../../models/permissionModel";

export async function createPermissions( req: any, res: any): Promise<ApiReturn>{
    console.log("[routes.auth.bindAuthRoutes] ROURTE -> /regiter");
    
    let permissionCreated : ApiReturn = {result: false, message: "Signup Failed", code: 500 };
    
    try {
        const perms: IPermission[] = req.body;
        
        if(!perms || Object.keys(perms).length === 0 ) {
            res.statusCode = 409;
            res.statusMessage = "REQUEST_FOR_EMPTY_USER";
            permissionCreated.message = "Missing data";
            return permissionCreated;
        }
        
        permissionCreated = await createHelper(perms);
    }
    catch(err){
        console.error("[auth.registerHelper] ERROR: ", err)
        permissionCreated = {result: false, message: "Signup Failed", code: 500 };
    }
    
    return res.json(permissionCreated); 
}

 async function createHelper (permissions: IPermission[]): Promise<ApiReturn>{
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
            await insertPermission(perm);
        }
        resp.result = true;
        resp.message += 'success';
        resp.code = 200;
    }
    
    return resp;
}

export async function getAllPermissionsHandler(req, res){
    let resp : ApiReturn = {
        result: false,
        message: "Read all permission ",
        code: 50002
    }

    resp = await getAllPermission();
    
    return res.json(resp); 

    return resp;
}

export async function readPermissions(permissionsSlugs: string[], roleID = ""){
    const resp : ApiReturn = {
        result: false,
        message: "Read permission ",
        code: 50003
    }
    return resp;
}
export async function updatePermissions(permissions: IPermission[]){
    const resp : ApiReturn = {
        result: false,
        message: "Update permission ",
        code: 50004
    }
    return resp;
}
export async function deletePermissions(){
    const resp : ApiReturn = {
        result: false,
        message: "Delete permission ",
        code: 50005
    }
    return resp;
}



