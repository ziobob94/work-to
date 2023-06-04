import { Request,Response } from "express";
import { PermissionModel } from "src/databaseModels";
export function checkPermission () {
  return (req: Request, res: Response, next) => {
    
/*     console.log("MDDLE")
    PermissionModel.find({"catKey": permission});
    if (!req.user.role.includes(permission)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next(); */
  }; 
}