import { Router } from "express";
import { createUser, login, sendEmail, forgotPassword, verifyToken, changePassword, logout, getAllUsers, updateStatus } from "./user.controller.js";
import { AdminGuard, AdminUserGuard, verifyTokenGuard } from "../middleware/guard.middleware.js";


const userRouter = Router();

//@post../api/user/signup
userRouter.post("/signup", createUser);

//@post../api/user/login
userRouter.post("/login", login);

//@get../api/user/logout
userRouter.get("/logout", logout);

//@get../api/user/get
userRouter.get("/get", AdminGuard, getAllUsers);

//@get../api/user/status
userRouter.put("/status/:id", AdminGuard, updateStatus);

//@post../api/user/sent-mail
userRouter.post("/send-mail", sendEmail);

//@post../api/user/forgot-password
userRouter.post("/forgot-password", forgotPassword);

//@post../api/user/forgot-password
userRouter.post("/verify-token", verifyTokenGuard, verifyToken);

//@post../api/user/forgot-password
userRouter.put("/change-password", verifyTokenGuard, changePassword);

//@get ../api/user/session
userRouter.get("/session", AdminUserGuard, (req, res) => {
    return res.json(req.user);
});

export default userRouter;