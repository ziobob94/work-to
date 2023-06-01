import express, { Router } from "express";
// import { checkPermission } from "../../middlewares/authorizationMiddleware";
import { createPermissions, getAllPermissionsCallback, deletePermissionCallback, updatePermissionCallback } from "../../controllers/admin/permissionsController";
import { createRoles, getAllRolesCallback } from "../../controllers/admin/rolesController";
import passport from "passport";

const adminRouter : Router = express.Router();


adminRouter.use("/admin", passport.authenticate('jwt', {session: false}),
    (req: any, res, next) => {
        // console.log("CIAO", req);

        if(req.isAuthenticated() && req.user.roleID === 'admin') return next();

        res.statusCode = 403;
        res.statusMessage = 'Unauthorized';

        return res.json(null); 
 
} );

async function getAdminCallback(req, res) {
    return res.json(true);
}
adminRouter.get("/admin", getAdminCallback)
adminRouter.get("/admin/permissions", getAllPermissionsCallback);
adminRouter.post("/admin/permissions", createPermissions);
adminRouter.put("/admin/permissions", updatePermissionCallback);
adminRouter.delete("/admin/permissions/:id", deletePermissionCallback);
adminRouter.post("/admin/roles", createRoles);
adminRouter.get("/admin/roles", getAllRolesCallback);




export default adminRouter;


