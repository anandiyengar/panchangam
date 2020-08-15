const mongoose = require("mongoose")
const express = require("express")
const path = require("path")
require("dotenv")
const port = process.env.PORT || 8000
const app = express()
app.use('/static',express.static("/uploads"))
mongoose.connect("mongodb+srv://anandiyengar1993:Anand@1993@cluster0.iyflr.mongodb.net/panchangam",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
} )
.then(() => console.log("DB CONNECTION ESTABLISED!!"))
.catch(err => console.log(err))

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//auth routes
const authRoutes = require("./Routes/auth")
app.use("/api", authRoutes)

//user routes
const userRoutes = require("./Routes/user")
app.use("/api", userRoutes)


//form routes
const formRoutes = require("./Routes/form")
app.use("/api", formRoutes)

//form routes
const scrapeRoutes = require("./Routes/scraping")
app.use("/api", scrapeRoutes)
var publicDir = require('path').join(__dirname,'/uploads'); 
app.use('/static',express.static(publicDir)); 

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('Client/build'))

    app.get('*', (req,res)=>{
        res.send(path.resolve(__dirname, 'Client', 'build', 'index.html', '/mob'))
    })
}


app.listen(port, () => {console.log("App is up and running on " + port)})