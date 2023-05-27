import express, { Router } from "express";
// import { checkPermission } from "../../middlewares/authorizationMiddleware";
import { createPermissions, getAllPermissionsHandler } from "../../controllers/admin/permissionsController";
import { createRoles, getAllRolesHandler } from "../../controllers/admin/rolesController";

const adminRouter : Router = express.Router();

adminRouter.use("/admin", (req, res, next) => {
    console.log("CIAO");
    next();
} );


adminRouter.get("/admin/permissions", getAllPermissionsHandler);
adminRouter.post("/admin/permissions", createPermissions);
adminRouter.post("/admin/roles", createRoles);
adminRouter.get("/admin/roles", getAllRolesHandler);



export default adminRouter;


