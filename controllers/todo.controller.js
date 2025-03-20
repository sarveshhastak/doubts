const asyncHandler = require("express-async-handler")
const Todo = require("../models/Todo")

exports.addTodo = asyncHandler(async (req, res) => {
    await Todo.create(req.body)
    res.json({ message: "Add Todo Success" })
})


exports.getTodo = asyncHandler(async (req, res) => {
    const result = await Todo.find()
    res.json({ message: "Get Todo Success", result })
})


exports.updateTodo = asyncHandler(async (req, res) => {

    await Todo.findByIdAndUpdate(req.params.tid, req.body)
    res.json({ message: "update Todo Success" })
})


exports.deleteTodo = asyncHandler(async (req, res) => {
    const { tid } = req.params
    await Todo.findByIdAndDelete(tid)
    res.json({ message: "Delete Todo Success" })
})