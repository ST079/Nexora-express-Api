import express from "express";
import userController from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { updateRolesSchema, userSchema } from "../libs/schemas/user.schema.js";
import checkRole from "../middlewares/checkRole.js";
import { ROLE_ADMIN } from "../constants/roles.js";
import { check } from "zod";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

/**
 * GET /api/v1/users/
 */

router.get("/", checkRole(ROLE_ADMIN), userController.getAllUser);

/**
 * GET /api/v1/users/me
 */

router.get("/me", userController.getLoggedInUser);

/**
 * GET /api/v1/users/:id
 */

router.get("/:id", checkRole(ROLE_ADMIN), userController.getUserById);

/**
 * Post /api/v1/users/
 */
router.post(
  "/",
  checkRole(ROLE_ADMIN),
  upload.single("image"),
  validate(userSchema),
  userController.createUser,
);

/**
 * Put /api/v1/users/update-profile
 */
router.put(
  "/update-profile",
  upload.single("image"),
  userController.updateUser,
);

/**
 * Patch /api/v1/users/profile-image
 */
router.patch(
  "/profile-image",
  upload.single("image"),
  userController.updateUserProfileImage,
);

/**
 * Delete /api/v1/users/:id
 */
router.delete("/:id", checkRole(ROLE_ADMIN), userController.deleteUser);

/**
 * Patch /api/v1/users/:id/roles
 */
router.patch(
  "/:id/roles",
  checkRole(ROLE_ADMIN),
  validate(updateRolesSchema),
  userController.updateUserRoles,
);

export default router;
