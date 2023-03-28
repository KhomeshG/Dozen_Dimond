const express = require("express")
const route= require("./routes/route")
const cors= require("cors")
require('dotenv').config()
let app= express()

const corsOptions={
    origin: "http://localhost:8080"
}
app.use(cors(corsOptions))
app.use(express.json())


app.use("/",route)

app.listen(process.env.PORT ,()=>{
    console.log("Server is running on -->" , process.env.PORT )
})

