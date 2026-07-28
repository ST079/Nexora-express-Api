import express from "express";
import { ROLE_ADMIN, ROLE_USER } from "../constants/roles.js";
import paymentController from "../controllers/payment.controller.js";
import auth from "../middlewares/auth.js";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

/**
 * GET /api/v1/payments/:id/status
 */

router.get(
  "/:id/status",
  checkRole(ROLE_USER),
  paymentController.checkPaymentStatus,
);

export default router;
