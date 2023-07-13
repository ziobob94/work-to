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
    slug: string,
    description?: string,
    roleID: string,
    catKey: string
  }
  
export type ApiReturn = {
    result: boolean,
    message: string,
    code: number,
    data?: any,
    error?: any
}

/**
 * THE TYPE FOR THE AGGREGATION BY ROLE FOR "IPermission" 
 * GROUPED BY PERMISSION AND ROLE ALL PERMISSIONS AND SAVES ROLES IN THE "rolesIDS"
 */
export interface PermissionAPI extends Omit<IPermission, 'roleID'> {
    rolesIDS: IRole[]
}


export type LoggerOption = {
  message?: string,
  file: string,
  error?: any,
  scope?: string,
  data?: any,
  stack?: any,
  className?: string
}