import { ApiReturn, IPermission, PermissionAPI } from "../types";
import { PermissionModel } from "../databaseModels";

export async function insertPermission(permission: IPermission ) : Promise<ApiReturn> {
  try {
    permission.catKey = permission.slug;
    const created = await PermissionModel.create(permission);
    if (created) {
      console.log('Permission created successfully: ', created);
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
    const aggregation = [
      {
        '$lookup': {
          'from': 'roles', 
          'localField': 'roleID', 
          'foreignField': 'role', 
          'as': 'role'
        }
      }, {
        '$group': {
          '_id': {
            'catKey': '$catKey'
          }, 
          'slug': {
            '$last': '$slug'
          }, 
          'name': {
            '$last': '$name'
          }, 
          'description': {
            '$last': '$description'
          }, 
          'documents': {
            '$push': {
              '$arrayElemAt': [
                '$role', 0
              ]
            }
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'slug': '$slug', 
          'name': '$name', 
          'catKey': '$_id.catKey', 
          'description': '$description', 
          'rolesIDS': '$documents'
        }
      }
    ]
    const values = await PermissionModel.aggregate(aggregation);
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

export async function deletePermission(permission: PermissionAPI) : Promise<ApiReturn> {
  
  try {
    
    const values = await PermissionModel.deleteMany({catKey: permission.catKey});
    if (values) {
      // console.log('Permissions deleted');
      return {result: true, message: "Permissions deleted successfully", code: 200, data: values};
    }
    else return {result: false, message: "Permissions delete failed", code: 401};
  }
  
  catch(error: any) {
    console.error('Error deleteing permission: ', error);
    return {result: false, message: error.message, code: 401};
  }
}


async function deletePermissionByRole(found: IPermission[], permission: PermissionAPI){
  /**
  * IF PERMISSION HAS REMOVED ROLES, PROVIDES TO DELETES THE PERMISSIONS DOCUMENT
  * ASSOCIATED TO THE DELETED ROLE
  */
  found.forEach(async ( perm: IPermission ) => {
    const roleIndex : number = permission.rolesIDS.findIndex((r) => (perm.roleID === r.role));
    if(roleIndex < 0) await PermissionModel.findByIdAndDelete(perm._id)
  })
}

async function addNewPermissionsPerRole(found: IPermission[], permission: PermissionAPI){
  /**
  * IF PERMISSION HAS NEW ROLES, PROVIDES TO ADD THE NEW PERMISSION DOCUMENTS
  * ASSOCIATED TO THE NEW ROLES ROLE
  */
  if(permission.rolesIDS.length > 0 ){
    permission.rolesIDS.forEach(async ( role, rInd ) => {
      
      const foundInd : number = found.findIndex((r: IPermission) => (role.role === r.roleID));
      
      if(foundInd < 0) await PermissionModel.create({
        name: permission.name,
        slug: permission.slug,
        catKey: permission.catKey,
        description: permission.description || "",
        roleID: permission.rolesIDS[rInd].role
      })
      
    })
  }
}


export async function updatePermission(permission: PermissionAPI) : Promise<ApiReturn> {
  
  const ret : ApiReturn = {
      result: false, 
      message: "Permission editing failed", 
      code: 500
    };

  try {
    if(permission.rolesIDS.length === 0 ){
       PermissionModel.deleteMany({catKey: permission.catKey});
       ret.result= true; 
       ret.message= "Permission editing success";
       ret.code= 200;
       return ret;
      }
    
    
    /**
    * FIND PermissionDocument WITH SAME SLUG OF permission 
    */
    const found : IPermission[] = (await PermissionModel.find({catKey: permission.catKey}));
    
    
    if(found && found.length > 0 ) {

      deletePermissionByRole(found, permission)
      
      addNewPermissionsPerRole(found, permission )

      const toUp : any = {
          name: permission.name,           
          slug: permission.slug,
          catKey: permission.catKey,
          description: (permission.description) ? permission.description : ""
        }
      
      const updated = await PermissionModel.updateMany({catKey: permission.catKey}, toUp);
      
      if (updated) {
        console.log('Permission created successfully: ', permission);
        ret.result= true; 
        ret.message= "Permission editing success";
        ret.code= 200;
        return ret;
      }
    }
  }
  catch(error: any) {
    console.error('Editing permission error: ', error);
  }
  return ret;
}

export async function getUserPermissions(userRole: string) : Promise<ApiReturn> {
  const ret : ApiReturn = {
    result: false, 
    message: "Permission editing failed", 
    code: 500
  };

    try {
    const permissions = await PermissionModel.find({  roleID: userRole  });
    if (permissions) {
      console.log('User permission successfully: ', permissions);
      return {result: true, message: "User created successfully", code: 200, data: permissions};
    }
    else return {result: false, message: "User creation failed", code: 401};
  }
  
  catch(error: any) {
    console.error('Error creating permission: ', error);
    return {result: false, message: error.message, code: 401};
  }
  return {result: false, message: "message", code: 401};
}


