const mongoose = require("mongoose")

FieldSchema = mongoose.Schema({
    Type:{
        type:String,
        default: "text",
        enum:["text", "text-area", "date", "select"]
    },
    Value: {
        type:String,
        trim:true
    },
    pickList: {
        type:Array,
    },
    hasChild : {
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model("Field", FieldSchema)