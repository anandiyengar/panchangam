const mongoose = require("mongoose")
const {v1: uuidv1 } = require("uuid")
const crypto = require("crypto")
const Schema = mongoose.Schema

const UserSchema = Schema({
    email: {
        type: String,
        unique:true,
        trim:true,
        required:true
    },
    encrypted_password: {
        type: String,
        required:true
    },
    salt: String,
}, {timestamp :true})

UserSchema.virtual("password")
.set(function(password){
    this.salt = uuidv1()
    this._password = password
    this.encrypted_password = this.securePassword(password)
})
.get(function(){
    return this._password
})

UserSchema.methods = {
    authenticate: function(pass){
        return this.encrypted_password === this.securePassword(pass)
    },

    securePassword: function(pass) {
        if (!pass) return ""
        try{
            return crypto.createHmac("sha256", this.salt)
            .update(pass)
            .digest('hex')
        } catch(err){
            console.log(err)
            return ""  
        }
    }
}

module.exports = mongoose.model("User", UserSchema)