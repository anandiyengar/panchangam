const express = require("express")
const { getUserById } = require("../Controller/user")
const { getFormById, createForm, getForm, removeForm, editForm, getAllForms, getCount, getLastDate } = require("../Controller/form")
const { isAuthenticated, isSignedIn } = require("../Controller/auth")
const router = express.Router()

router.param("userId", getUserById)
router.param("formId", getFormById)


router.post("/form/create/:userId", isAuthenticated, isSignedIn, createForm)

router.get("/form/:formId",  getForm)

router.delete("/form/:userId/:formId", isAuthenticated, isSignedIn, removeForm)

router.put("/form/:userId/:formId", isAuthenticated, isSignedIn, editForm)

router.get("/forms/:userId", isAuthenticated, isSignedIn, getAllForms)
router.get("/home-count", getCount)
router.get("/home-date", getLastDate)



module.exports = router