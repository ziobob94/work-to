import { IRole } from "../../databaseModels";
import { ApiReturn } from "../../types"
import { getAllRole, insertRole } from "../../models/roleModel";

export async function createRoles( req: any, res: any): Promise<ApiReturn>{
    console.log("[routes.auth.bindAuthRoutes] ROURTE -> /regiter");
    
    let roleCreated : ApiReturn = {result: false, message: "Signup Failed", code: 500 };
    
    try {
        const perms: IRole[] = req.body;
        
        if(!perms || Object.keys(perms).length === 0 ) {
            res.statusCode = 409;
            res.statusMessage = "REQUEST_FOR_EMPTY_USER";
            roleCreated.message = "Missing data";
            return roleCreated;
        }
        
        roleCreated = await createHelper(perms);
    }
    catch(err){
        console.error("[auth.registerHelper] ERROR: ", err)
        roleCreated = {result: false, message: "Signup Failed", code: 500 };
    }
    
    return res.json(roleCreated); 
}

 async function createHelper (roles: IRole[]): Promise<ApiReturn>{
    const resp : ApiReturn = {
        result: false,
        message: "Creation role ",
        code: 50001
    }

    if(roles?.length > 0) {
        const len: number = roles.length;
        let perm : IRole = null;
        for(let i = 0; i < len; i++){
            perm = roles[i];
            await insertRole(perm);
        }
        resp.result = true;
        resp.message += 'success';
        resp.code = 200;
    }
    
    return resp;
}

export async function getAllRolesCallback(req, res){
    let resp : ApiReturn = {
        result: false,
        message: "Read all role ",
        code: 50002
    }

    resp = await getAllRole();
    
    return res.json(resp); 

    return resp;
}

export async function readRoles(rolesSlugs: string[], roleID = ""){
    const resp : ApiReturn = {
        result: false,
        message: "Read role ",
        code: 50003
    }
    return resp;
}

export async function updateRoles(roles: IRole[]){
    const resp : ApiReturn = {
        result: false,
        message: "Update role ",
        code: 50004
    }
    return resp;
}

export async function deleteRoles(){
    const resp : ApiReturn = {
        result: false,
        message: "Delete role ",
        code: 50005
    }
    return resp;
}



