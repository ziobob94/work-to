import { UserModel } from "../databaseModels";
import { ApiReturn } from "../types";
import * as messages from "../messages.json"

export async function insertUser(user: any) : Promise<ApiReturn> {

    try {
        const created = await UserModel.create(user);
        if (created) {
            console.log('User created successfully:', user);
            return {result: true, message: messages["50000"], code: 200, data: created};
        }
        else return {result: false, message: messages["50002"], code: 401};
    }
    
    catch(error: any) {
        console.error('Error creating user:', error);
        return {result: false, message: messages["50003"], code: 500};
    }
}