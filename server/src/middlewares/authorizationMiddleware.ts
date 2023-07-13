import { Request,Response } from "express";

export function checkPermission () {
  return (req: Request, res: Response, next) => {
    
/*     logger.info("MDDLE")
    PermissionModel.find({"catKey": permission});
    if (!req.user.role.includes(permission)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next(); */
  }; 
}