import { Router } from "express";
import passport from "passport";
import * as USerController from "../controller/UserController.js";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  USerController.index
  
);

export default router;
