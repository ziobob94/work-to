import { Document } from "mongoose";
export interface IUser extends Document {
    first: string,
    last: string,
    email: string;
    username: string,
    password: string,
    termsAccepted: boolean,
    roleID: string
  }
  
  export interface IRole extends Document {
      name: string,
      role: string,
  }
export interface IPermission extends Document {
    name: string,
    descrtiption?: string,
    slug: string,
    roleID: string
  }
  
export type ApiReturn = {
    result: boolean,
    message: string,
    code: number,
    data?: any,
    error?: any
}


export interface PermissionReq extends Omit<IPermission, 'roleID'> {
    rolesIDS: IRole[]
}
