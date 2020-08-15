const express = require("express")
const { getDetails, getFormDetails, getImage } = require("../Controller/Scraping2")
const { getDetails1, getFormDetails1} = require("../Controller/scraping")
const router = express.Router()
const { getFormById } = require("../Controller/form")


router.param("dateId", getDetails)
router.param("formId", getFormById)

router.get("/scrape-api/:dateId", getFormDetails)

router.param("dateId1", getDetails1)
router.get("/scrape/:dateId1", getFormDetails1)


router.get("/makeimage/:formId", getImage)



module.exports = router