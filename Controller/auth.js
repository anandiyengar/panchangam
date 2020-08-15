const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const User = require("../Models/user")


exports.signout = (req, res) => {
    res.clearCookie("token")
    return res.json({
        message:"logout successful!"
    })
}



exports.signUp = (req, res) => {
    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({error: "Not able to save user to db."})
        }
        else{
            return res.json({
                email: user.email,
                id: user._id
            })
        }
    })
}


exports.signIn = (req, res) => {
    const {email, password} = req.body
    User.findOne({email}).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "Sorry! No account with that email present."
            })
        }
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: "Invalid username or password!"
            })
        }
        const token = jwt.sign({_id:user._id}, "panchangam")

        res.cookie("token", token, {expire:new Date() + 100})
        return res.json({
            token, user: {id: user._id, email: user.email}
        })

    })
}

exports.isSignedIn = expressJwt({ secret: "panchangam",
    userProperty:"auth", 
    algorithms: ["HS256"]})



exports.isAuthenticated = (error, req, res, next) => {
    if(!req.auth ||!req.profile || req.profile.id != req.auth.id || error.type == "UnauthorizedError"){
        return res.status(400).json({
            error: "Access denied!!"
        })
    }
    next()
}

exports.checkLogin = (req,res) => {
    return res.json({
        login:"true" 
       })
}

