
const router = require("express").Router()
const admin = require("./../controllers/admin.controller")

router
    // technology
    .get("/get-tech", admin.getTechnology)
    .post("/add-tech", admin.addTechnology)
    .put("/update-tech/:id", admin.updateTechnology)
    .delete("/delete-tech/:id", admin.deleteTechnology)

    // Social
    .get("/get-social", admin.getSocial)
    .post("/add-social", admin.addSocial)
    .put("/update-social/:id", admin.updateSocial)
    .delete("/delete-social/:id", admin.deleteSocial)

    // Carousel
    .get("/get-caption", admin.getCaption)
    .post("/add-caption", admin.addCaption)



module.exports = router
