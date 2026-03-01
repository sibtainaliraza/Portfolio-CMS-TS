import { Router } from "express";
import { createProject, getProjects, updateProject, deleteProject } from "../controllers/project.controller.js";

const router: Router = Router();

router.route("/")
    .get(getProjects)
    .post(createProject);

router.route("/:id")
    .put(updateProject)
    .delete(deleteProject);

export default router;