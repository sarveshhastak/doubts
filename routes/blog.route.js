const blog = require("../controllers/blog.controller")

const router = require("express").Router()
router
    .post("/create-blog", blog.createBlog)
    .get("/get-blog", blog.getBlog)
    .patch("/update-blog/:bid", blog.updateBlog)
    .delete("/delete-blog/:bid", blog.deleteBlog)
module.exports = router