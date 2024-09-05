
const router = require("express").Router()
const admin = require("./../controllers/admin.controller")

router
    .get("/get-tech", admin.getTechnology)
    .post("/add-tech", admin.addTechnology)
    .put("/update-tech/:id", admin.updateTechnology)
    .delete("/delete-tech/:id", admin.deleteTechnology)


module.exports = router
