// edit 
const Form = require("../Models/form")
const User = require("../Models/user")

exports.createForm = (req, res) => {
    const form = new Form(req.body)
    form.user = req.profile._id
    form.save((err, f) => {
        if(err || !f) {
            return res.status(400).json({
                error: "Form was not saved."+err,
            })
        }
        return res.json({
            form: f
        })
    })
}

exports.getFormById = (req, res, next, Id) => {
    Form.findById(Id).exec((err, form) => {
        if(err || !form){
            return res.status(400).json({
                error: "Could not get the form."
            })
        }
        req.form = form
        next()
    })
}

exports.getLastDate = (req,res) => {
    Form.find().sort({$natural:-1}).limit(1).exec((err, form) => {
        if(err || !form){
            return res.status(400).json({
                error: "Could not get the form."
            })
        }
      return res.json({
          last:form
      })
    })
}

exports.getCount = (req,res) => {
    let f1 = ''
    let f2 = ''
    Form.find().sort({$natural:-1}).limit(1).exec((err, form) => {
        if(err || !form){
            return res.status(400).json({
                error: "Could not get the form."
            })
        }
    Form.find().count().exec((err1, form1) => {
        if(err1 || !form1){
            return res.status(400).json({
                error: "Could not get the form."
            })
        }
        res.json({
            
            count:form1,
            data:form,
            
        })
    })
    
})
}

exports.getForm = (req, res) => {
    return res.json(req.form)
}


exports.getAllForms = (req, res) => {
    Form.find()
    .exec((err, forms) => {
        if(err){
            return res.status(400).json({
                error:"Forms not found!"
            })
        }
        return res.json(forms)
    })
}

exports.editForm = (req, res) => {
    Form.findByIdAndUpdate(
        {_id: req.form._id},// find by _id
        {$set: req.body},     // to get the new field from frontend
        {new:true},// Compulsary stuff
        (err, form) => {
            if(err){
                return res.status(400).json({
                    error:"Sorry! No changes could be made."
                })
            }
            return res.json(form)
        }
    )
}

exports.removeForm = (req, res) => {
    const formId = req.form._id
    Form.findByIdAndDelete(formId).exec((err, item) => {
        if(err){
            return res.status(400).json({
                error: "Error removing form."
            })
        }
        res.json(item)
    })
}