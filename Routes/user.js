const express = require("express")
const { getUserById, getUser } = require("../Controller/user")
const { isAuthenticated, isSignedIn } = require("../Controller/auth")
const router = express.Router()


router.param("userId", getUserById)


router.get("/user/:userId", isAuthenticated, isSignedIn, getUser)

module.exports = router