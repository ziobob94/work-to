import express, { Router } from "express";
// import { checkPermission } from "../../middlewares/authorizationMiddleware";
import { createPermissions, getAllPermissionsCallback, deletePermissionCallback, updatePermissionCallback } from "../../controllers/admin/permissionsController";
import { createRoles, getAllRolesCallback } from "../../controllers/admin/rolesController";

const adminRouter : Router = express.Router();

adminRouter.use("/admin", (req, res, next) => {
    console.log("CIAO");
    next();
} );


adminRouter.get("/admin/permissions", getAllPermissionsCallback);
adminRouter.post("/admin/permissions", createPermissions);
adminRouter.put("/admin/permissions", updatePermissionCallback);
adminRouter.delete("/admin/permissions/:id", deletePermissionCallback);
adminRouter.post("/admin/roles", createRoles);
adminRouter.get("/admin/roles", getAllRolesCallback);



export default adminRouter;


