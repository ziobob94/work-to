import { UserModel } from "../databaseModels";
import { ApiReturn } from "../types";

export async function insertUser(user) : Promise<ApiReturn> {

    try {
        const created = await UserModel.create(user);
        if (created) {
            console.log('User created successfully:', user);
            return {result: true, message: "User created successfully", code: 200};
        }
        else return {result: false, message: "User creation failed", code: 401};
    }
    
    catch(error: any) {
        console.error('Error creating user:', error);
        return {result: false, message: error.message, code: 401};
    }
}