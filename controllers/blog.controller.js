const Blog = require("../models/Blog")
const upload = require("../utils/upload")
const cloud = require("cloudinary").v2
const path = require("path")

cloud.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.createBlog = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ message: "Unable To Upload", error: err.message })
            }

            // const { secure_url } = await cloud.uploader.upload(req.file.path)
            const data = await cloud.uploader.upload(req.file.path)

            //                                                              👇id of loggedin user
            await Blog.create({ ...req.body, hero: data.secure_url, user: req.user })
            // await Blog.create({ ...req.body, hero: secure_url })
            console.log(data);

            console.log(req.file)
            console.log(req.body)
            res.json({ message: "Blog Create Success" })

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error !", error: error.message })

    }
}


exports.getBlog = async (req, res) => {
    try {
        const result = await Blog.find({ user: req.user })
        res.json({ message: "Blog Get Success", result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error !", error: error.message })

    }
}


exports.updateBlog = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            const { bid } = req.params
            if (req.file) {
                const result = await Blog.findById(bid)
                await cloud.uploader.destroy(path.basename(result.hero).split(".")[0])

                const { secure_url } = await cloud.uploader.upload(req.file.path)
                await Blog.findByIdAndUpdate(bid, { ...req.body, hero: secure_url })
                res.json({ message: "Blog Update Success" })
            } else {
                await Blog.findByIdAndUpdate(bid, req.body)
                res.json({ message: "Blog Update Success" })
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error !", error: error.message })

    }
}


exports.deleteBlog = async (req, res) => {
    try {
        const { bid } = req.params
        const result = await Blog.findById(bid)
        await cloud.uploader.destroy(path.basename(result.hero).split(".")[0])
        await Blog.findByIdAndDelete(bid)
        res.json({ message: "Blog Delete Success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error !", error: error.message })

    }
}