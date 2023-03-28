const db= require("../model/dbconfig")

const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
const { where } = require("sequelize")


//main Model

const user_registration= db.user_registration

//main Work CRUD

module.exports.userRegister= async (req,res)=>{

   try{ 
    let data= req.body
    let  password= data.password

    data.password= await bcrypt.hash(password,10)
   let result= await user_registration.create(data)

   res.status(201).send({data:result , status:true})

}
    catch(err){
        res.status(500).send({msg:"Server Error!!!",err:err , err1:err.message, status:false})
    }

}
module.exports.userLogin= async (req,res)=>{

   try{ 
    let data= req.body
   let user= await user_registration.findOne({where :{email: data.email }})
   if(user.status!="Active"){
    return res.status(404).send({status:false , msg:'Your Account is De_Activate'})
   }

   let result= await bcrypt.compare(data.password,user.password)
  
   if(result){
    let token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          iat: new Date().getTime(),
          exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
        },
        "demon_diamond"
      );
   return  res.status(200).send({userId:user.id ,token:token, status:true })
   }
   else{
   return  res.status(404).send({msg:"Not Found" , status:false , redirect_Link:"http://localhost:3000/register"})
   }
}
    catch(err){
    return    res.status(500).send({msg:"Server Error!!!", err:err , err1:err.message, status:false})

    }

}

module.exports.getUser= async (req,res)=>{

    try{
        let data= req.body

        let user= await user_registration.findOne({where:{id:parseInt(req.params.id)}})
        return  res.status(200).send({data:user ,status:true , msg:'Sucess'})
    }
    catch(err){
        return res.status(500).send({ status:false , msg:"Server error !!"})
    }
}


module.exports.updateUser= async (req,res)=>{

    try{
    let data=req.body
    let info={}
    if(data.email){
        info.email=data.email
    }
    if(data.password){
       
        info.password=  await bcrypt.hash(data.password,10)
    }
    if(data.mobileNumber){
        info.mobileNumber=data.mobileNumber
    }
    if(data.status){
        info.status=data.status
    }
    let user= await user_registration.update(info,{where:{id:parseInt(req.params.id)}})

    return res.status(200).send({data:user , status:true , msg:"Sucess"})
}
    catch(err){
    return res.status(500).send({ status:false , msg:"Server error !!"})
}
    }


   



