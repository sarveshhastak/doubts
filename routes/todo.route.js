const todo = require("../controllers/todo.controller")

const router = require("express").Router()
router
    .post("/create", todo.addTodo)
    .get("/get", todo.getTodo)
    .patch("/update/:tid", todo.updateTodo)
    .delete("/delete/:tid", todo.deleteTodo)
module.exports = router