import { ApiReturn } from "../types";
import { PermissionModel } from "../databaseModels";

export async function insertPermission(permission) : Promise<ApiReturn> {

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
        const columns = await PermissionModel.find({}).distinct('name');
        const values = await PermissionModel.find({});
        if (columns && values) {
            console.log('Permissions got');
            return {result: true, message: "Permissions got successfully", code: 200, data: {columns, values}};
        }
        else return {result: false, message: "Permissions get failed", code: 401};
    }
    
    catch(error: any) {
        console.error('Error getting all permissions: ', error);
        return {result: false, message: error.message, code: 401};
    }
}