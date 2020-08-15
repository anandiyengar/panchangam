const express = require("express")
const { signUp, signIn, isSignedIn, isAuthenticated, signout, checkLogin   } = require("../Controller/auth")
const router = express.Router()



//signUp route
router.post("/signup", signUp)

//signIn route

router.post("/signin", signIn)

//logOut

router.get("/signout", signout  )

router.get("/checklogin",isSignedIn,isAuthenticated, checkLogin  )


module.exports = router