const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/checkEmpty")
const Technology = require("../models/Technology")
const Social = require("../models/Social")
const Carousel = require("../models/Carousel")
const path = require("path")
const upload = require("../utils/upload")
const cloudinary = require("../utils/cloudinary.config")
const { error, log } = require("console")



// technology
exports.addTechnology = asyncHandler(async (req, res) => {
    const { name, category } = req.body
    const { isError, error } = checkEmpty({ name, category })
    if (isError) {
        return res.status(400).json({ message: "All Feild Required", error })
    }
    await Technology.create({ name, category })
    res.json({ message: "Technology Create Success" })
})
exports.getTechnology = asyncHandler(async (req, res) => {
    const result = await Technology.find()
    res.json({ message: "Technology Fetch Success", result })
})
exports.updateTechnology = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Technology.findByIdAndUpdate(id, req.body)
    res.json({ message: "Technology Update Success" })
})
exports.deleteTechnology = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Technology.findByIdAndDelete(id)
    res.json({ message: "Technology Delete Success" })
})

// social

exports.addSocial = asyncHandler(async (req, res) => {
    const { name, link } = req.body
    const { isError, error } = checkEmpty({ name, link })
    if (isError) {
        return res.status(400).json({ message: "All Feild Required", error })
    }
    await Social.create({ name, link })
    res.json({ message: "Socail Create Success" })
})
exports.getSocial = asyncHandler(async (req, res) => {
    const result = await Social.find()
    res.json({ message: "Socail Fetch Success", result })
})
exports.updateSocial = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Social.findByIdAndUpdate(id, req.body)
    res.json({ message: "Socail Update Success" })
})
exports.deleteSocial = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Technology.findByIdAndDelete(id)
    res.json({ message: "Socail Delete Success" })
})

// carousel
exports.getCaption = asyncHandler(async (req, res) => {
    const result = await Carousel.find()
    res.json({ message: "Caption Fetch Success", result })
})

exports.addCaption = asyncHandler(async (req, res) => {
    // upload
    // upload(req, res, async (err) => {
    //     if (err) {
    //         console.log(err)
    //         return res.status(400).json({ message: "Multer error", err })
    //     }
    //     if (!req.file) {
    //         console.log("inside")
    //         const result = await Carousel.create({ ...req.body, image: req.file.filename })
    //         res.json({ message: "Caption Add Success", result })

    //     } else {

    //         return res.json({ message: "Thumb Image Is Reqiure" })
    //     }
    // })

    upload(req, res, async err => {
        const { caption } = req.body
        const { isError, error } = checkEmpty({ caption })
        if (isError) {
            return res.status(400).json({ message: "all filed reqiured", error })
        }
        if (!req.file) {
            return res.status(400).json({ message: "hero filed reqiured" })
        }
        const { secure_url } = await cloudinary.uploader.upload(req.file.path)
        await Carousel.create({ hero: secure_url, caption })
        return res.json("carousel create success")
    })
    const result = await Carousel.create(req.body)
    res.json({ message: "Caption Add Success", result })
})
exports.updateCaption = asyncHandler(async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            console.log(err)

            return res.status(400).json({ message: "Multer error", error: err.message })
        }
        const { id } = req.params
        if (req.file) {
            const result = await Carousel.findById(id)
            await cloudinary.uploader.destroy(path.basename(result.hero))
            const { secure_url } = await cloudinary.uploader.upload(req.file.path)

            await Carousel.findByIdAndUpdate(id, { caption: req.body.caption, hero: secure_url })
            res.json({ message: "Caption Update Success" })
        } else {
            await Carousel.findByIdAndUpdate(id, { caption: req.body.caption })
            res.json({ message: "Caption Update Success" })

        }
    })
})
exports.deleteCaption = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Carousel.findById(id)
    console.log(result)

    await cloudinary.uploader.destroy(path.basename(result.hero))
    await Carousel.findByIdAndDelete(id)
    res.json({ message: "Caption Delete Success" })
})