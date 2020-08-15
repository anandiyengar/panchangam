const mongoose = require("mongoose")
const User = require("./user")
const {ObjectId}= mongoose.Schema

FormSchema = mongoose.Schema({
    user: {
        type:ObjectId, 
        ref: User
    },
    Dates: {
        type:String,
        trim:true,
        unique:true,
        require:true
    },
     Day: {
        type:String
    },
    TamilMonth: {
        type:String,
        trim:true
    },
    TamilDate: {
        type:Number,
        trim:true
    },
    TamilDay: {
        type:String,
        trim:true
    },
    TamilMonth: {
        type:String,
        trim:true
    },
    Note1: {
        type:String,
        trim:true
    },
    Note2: {
        type:String,
        trim:true
    },
    TamilMonth: {
        type:String,
        trim:true
    },
    Ayanam: {
        type:String,
        trim:true
    },
    Ruthou: {
        type:String,
        trim:true
    },
    Mase: {
        type:String,
        trim:true
    },
    Pakshe: {
        type:String,
        trim:true
    },
    Tithi: {
        type:String,
        trim:true
    },
    Time: {
        type:String,
        trim:true
    },
    NextTithi:{
        type:String,
        trim:true
    },
    Vasaram: {
        type:String,
        trim:true
    },
    Nakshatram: {
        type:String,
        trim:true
    },
    NextNakshatram: {
        type:String,
        trim:true
    },
    TamilMonth: {
        type:String,
        trim:true
    },
    Time2:{
        type: String,
        trim:true
    },
    NallaNeram: {
        type:String,
        trim:true
    },
    PM: {
        type:String,
        trim:true
    },
    RaghuKalam: {
        type:String,
        trim:true
    },
    Yemakandam:{
        type:String,
        trim:true
    },
    kuligai:{
        type:String,
        trim:true
    },
    Yogam: {
        type:String,
        trim:true
    },
    Chandrashtamam: {
        type:String,
        trim:true
    },
    NextChandrashtamam:{
        type:String,
        trim:true
    },
    Sunrise:{
        type:String,
        trim:true
    },
    Sunset:{
        type:String,
        trim:true
    },
    AdditionalInfo : {
        type:String,
        trim:true
    },
    TableTithi:{
        type:String
    },
    SrardTithi:{
        type:String
    }

})

module.exports = mongoose.model("Form", FormSchema)