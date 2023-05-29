import { ApiReturn } from "../types";
import { IPermission, PermissionModel } from "../databaseModels";

export async function insertPermission(permission: any) : Promise<ApiReturn> {

    try {
        const created = await PermissionModel.create(permission);
        if (created) {
            console.log('Permission created successfully: ', permission);
            return {result: true, message: "User created successfully", code: 200};
        }
        else return {result: false, message: "User creation failed", code: 401};
    }
    
    catch(error: any) {
        console.error('Error creating permission: ', error);
        return {result: false, message: error.message, code: 401};
    }
}

export async function getAllPermission() : Promise<ApiReturn> {

    try {
        const values = await PermissionModel.find({});
        if (values) {
            console.log('Permissions got');
            return {result: true, message: "Permissions got successfully", code: 200, data: values};
        }
        else return {result: false, message: "Permissions get failed", code: 401};
    }
    
    catch(error: any) {
        console.error('Error getting all permissions: ', error);
        return {result: false, message: error.message, code: 401};
    }
}

export async function deletePermission(id: any) : Promise<ApiReturn> {

    try {
        const values = await PermissionModel.findOneAndDelete({_id: id});
        if (values) {
            console.log('Permissions deleted');
            return {result: true, message: "Permissions deleted successfully", code: 200, data: values};
        }
        else return {result: false, message: "Permissions delete failed", code: 401};
    }
    
    catch(error: any) {
        console.error('Error deleteing permission: ', error);
        return {result: false, message: error.message, code: 401};
    }
}

export async function updatePermission(permission: IPermission) : Promise<ApiReturn> {

    try {
        const updated = await PermissionModel.findOneAndUpdate({_id: permission._id}, {
            name: permission.name,           
            slug: permission.slug,
            descrtiption: permission.descrtiption,
            rolesIDS: permission.rolesIDS

        });
        if (updated) {
            console.log('Permission created successfully: ', permission);
            return {result: true, message: "User created successfully", code: 200};
        }
        else return {result: false, message: "User creation failed", code: 401};
    }
    
    catch(error: any) {
        console.error('Error creating permission: ', error);
        return {result: false, message: error.message, code: 401};
    }
}

export async function getUserPermissions(userRole: IPermission) : Promise<ApiReturn> {

/*     try {
        //TODO: qui
        const permissions = await PermissionModel.aggregate([
            {
              '$match': {
                '_id': '6471f82726952cc7fce06bfc'
              }
            }, {
              '$lookup': {
                'from': 'permissions', 
                'localField': 'role', 
                'foreignField': 'roleID', 
                'as': 'result'
              }
            }, {
              '$project': {
                'result': '$result'
              }
            }
          ]); 
        if (permissions) {
            console.log('User permission successfully: ', permissions);
            return {result: true, message: "User created successfully", code: 200, data: permissions};
        }
        else return {result: false, message: "User creation failed", code: 401};
    }
    
    catch(error: any) {
        console.error('Error creating permission: ', error);
        return {result: false, message: error.message, code: 401};
    } */
    return {result: false, message: "message", code: 401};
}


