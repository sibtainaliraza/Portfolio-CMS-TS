import { Router } from "express";
import { createBlog, getAllBlogs, updateBlog, deleteBlog, getSingleBlog } from "../controllers/blog.controller.js";

const router: Router = Router();

router.route("/")
    .get(getAllBlogs)
    .post(createBlog);

router.route("/:slug")
    .get(getSingleBlog)
    .put(updateBlog)
    .delete(deleteBlog);


export default router;