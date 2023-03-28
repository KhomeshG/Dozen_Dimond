const express = require("express")

const router= express.Router()

const userController= require("../controller/user")
const middleware= require("../auth/auth")

const validation= require("../validation/user")



//test
router.get("/test-me",(req,res)=>{
    console.log("Working fine")


    res.send("working fine")
})
//user
router.post("/register" ,validation.createUser ,userController.userRegister)
router.get("/login" ,validation.userLogin, userController.userLogin )
router.get("/user/:id/profile" , middleware.authentication , middleware.authorization ,userController.getUser )
router.patch("/user/:id/profile", middleware.authentication ,middleware.authorization ,validation.userUpdate,userController.updateUser )

module.exports= router