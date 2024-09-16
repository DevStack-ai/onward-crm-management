import { Router } from "express";
import { AuthController } from "../../controllers/admin.controller";
import AuthMiddleware from "../../middleware/auth";
const router = Router();

const controller = new AuthController();

// router.post("/login", controller.login.bind(controller));
// router.post("/verify_token", controller.verifyToken.bind(controller));
router.use(AuthMiddleware)

// router.post("/reset-password", controller.resetPassword.bind(controller))
// router.post("/create", controller.createadmin.bind(controller))
// router.get("/details/:id", controller.getAdminById.bind(controller))
// router.put('/update/:id', controller.updateAdminById.bind(controller))

// router.post("/table", controller.getAdminsTable.bind(controller))
// router.post("/available/:field", controller.getAvailableField.bind(controller))
// router.post("/export", controller.downloadAdmins.bind(controller))


export default router;