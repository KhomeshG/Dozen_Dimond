const express = require("express")

const router= express.Router()

const userController= require("../controller/user")
const middleware= require("../auth/auth")

const validation= require("../validation/user")

//fyeres
const fyeres= require("../fyers/fyere")

const fyers= require("../fyers/fyersv1")



//test
router.get("/test-me",(req,res)=>{
    console.log("Working fine")


    res.send("working fine")
})
//user
router.post("/register" ,validation.createUser ,userController.userRegister)
router.get("/login" ,validation.userLogin, userController.userLogin , fyeres.fyersAuth )
router.post("/dozendiamonds" ,fyeres.fyersAuth1)
router.get("/user/:id/profile" , middleware.authentication , middleware.authorization ,userController.getUser )
router.patch("/user/:id/profile", middleware.authentication ,middleware.authorization ,validation.userUpdate,userController.updateUser )

//fyers

router.get("/fyerUser",fyeres.fyersUser)
router.get("/stockHistory",fyeres.historyData)
router.get("/fyersUserFunds",fyeres.fyersUserFunds)//getFunds
router.get("/stockData",fyeres.stockData)//getFunds

//All StocksData
router.get("/allStocks" , fyers.main)


module.exports= router