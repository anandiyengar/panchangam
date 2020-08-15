const User = require("../Models/user")

exports.getUserById = (req, res, next, Id) => {
    User.findById(Id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "Could not find the user"
            })
        }

        req.profile = user
        next()
    })
}


exports.getUser = (req, res) => {
    req.profile.salt = undefined
    req.profile.encrypted_password = undefined
    return res.json(req.profile)
}
