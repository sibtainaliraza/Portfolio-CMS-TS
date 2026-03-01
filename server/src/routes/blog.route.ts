import { Router } from "express";
import { createBlog, getAllBlogs, updateBlog, deleteBlog, getSingleBlog } from "../controllers/blog.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router: Router = Router();

router.route("/")
    .get(getAllBlogs)
    .post(protect, createBlog);

router.route("/:slug")
    .get(protect, getSingleBlog)
    .put(protect, updateBlog)
    .delete(protect, deleteBlog);


export default router;