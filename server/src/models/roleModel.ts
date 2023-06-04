import { ApiReturn, IRole } from "../types";
import { RoleModel } from "./permissionModel";

export async function insertRole(role: IRole) : Promise<ApiReturn> {

    try {
        const created = await RoleModel.create(role);
        if (created) {
            console.log('Role created successfully: ', role);
            return {result: true, message: "User created successfully", code: 200};
        }
        else return {result: false, message: "User creation failed", code: 401};
    }
    
    catch(error: any) {
        console.error('Error creating role: ', error);
        return {result: false, message: error.message, code: 401};
    }
}

export async function getAllRole() : Promise<ApiReturn> {

    try {
        const values : IRole[] = await RoleModel.find({});
        if (values) {
            console.log('Roles got');
            return {result: true, message: "Roles got successfully", code: 200, data: values};
        }
        else return {result: false, message: "Roles get failed", code: 401};
    }
    
    catch(error: any) {
        console.error('Error getting all roles: ', error);
        return {result: false, message: error.message, code: 401};
    }
}