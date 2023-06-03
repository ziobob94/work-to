import express, { Router } from "express";
// import { checkPermission } from "../../middlewares/authorizationMiddleware";
import { createPermissions, getAllPermissionsCallback, deletePermissionCallback, updatePermissionCallback } from "../../controllers/admin/permissionsController";
import { createRoles, getAllRolesCallback } from "../../controllers/admin/rolesController";
import passport from "passport";
import { Request,Response } from "express";

const adminRouter : Router = express.Router();

/**
 * MIDDLEWARE
 */
adminRouter.use("/admin", passport.authenticate('jwt', {session: false}),
    (req: any, res, next) => {
        // console.log("CIAO", req);

        if(req.isAuthenticated() && req.user.roleID === 'admin') return next();

        res.statusCode = 403;
        res.statusMessage = 'Unauthorized';

        return res.json(null); 
 
} );

async function getAdminCallback(req: Request, res: Response) {
    return res.json(true);
}

/**
 * Permissions
 */
/**
 * VOID
 */
adminRouter.get("/admin", getAdminCallback)
/**
 * GET ALL PERMISSIONS
 */
adminRouter.get("/admin/permissions", getAllPermissionsCallback);
/** 
 * CREATE MULTIPLE PERMISSIONS 
*/
adminRouter.post("/admin/permissions", createPermissions);
/** 
 * UPDATE MULTIPLE PERMISSIONS 
*/
adminRouter.put("/admin/permissions", updatePermissionCallback);
/** 
 * DELETE MULTIPLE PERMISSIONS 
*/
adminRouter.post("/admin/permissions/:id", deletePermissionCallback);

/**
 * Roles
*/
adminRouter.post("/admin/roles", createRoles);
/**
 * GET ALL ROLES
 */
adminRouter.get("/admin/roles", getAllRolesCallback);




export default adminRouter;


