import { Router } from "express";
import { createProject, getProjects, updateProject, deleteProject } from "../controllers/project.controller.js";
import {protect} from "../middleware/auth.middleware.js"
const router: Router = Router();

router.route("/")
    .get(getProjects)
    .post(protect, createProject);

router.route("/:id")
    .put(protect,updateProject)
    .delete(protect, deleteProject);

export default router;