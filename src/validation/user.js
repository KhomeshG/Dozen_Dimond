const db= require("../model/dbconfig")
//main Model

const user_registration= db.user_registration

function isvalidRequestBody(requestBody) {
    return Object.keys(requestBody).length > 0;
  }
function isValid(value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  }

  function validateMobile($phone) {
    var phoneReg = /^[6789]\d{9}$/;
    if (!phoneReg.test($phone)) {
      return false;
    } else {
      return true;
    }
  }
  
  function validateEmail($email) {
    var emailReg = /^(\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3}))$/;
    if (!emailReg.test($email)) {
      return false;
    } else {
      return true;
    }
  }

  function onlyAplha(value) {
    return /^[a-zA-Z/s]/.test(value);
  }

  function isValidStatus(status) {
    return ["Active", "Un_ACtive"].indexOf(status) !== -1;
  }

module.exports={
    createUser: async (req, res, next) => {
        try {
          let data = req.body;
          if (!isvalidRequestBody(req.body)) {
            return res
              .status(400)
              .send({ status: false, msg: " cant accept empty Request" });
          }
          let { firstName, lastName, email, password, mobileNumber } = data;
          if (!firstName) {
            return res.status(400).send({ staus: false, msg: "firstName is required" });
          }
          if (!onlyAplha(firstName)) {
            return res
              .status(400)
              .send({ staus: false, msg: "firstName can be in Alphabets only" });
          }
          if (!isValid(firstName)) {
            return res
              .status(400)
              .send({ staus: false, msg: "firstName can not be empty" });
          }
          if (!lastName) {
            return res.status(400).send({ staus: false, msg: "lastName is required" });
          }
          if (!onlyAplha(lastName)) {
            return res
              .status(400)
              .send({ staus: false, msg: "lastName can be in Alphabets only" });
          }
          if (!isValid(lastName)) {
            return res
              .status(400)
              .send({ staus: false, msg: "lastName can not be empty" });
          }

          if (!mobileNumber) {
            return res
              .status(400)
              .send({ staus: false, msg: "mobile number is required" });
          }
          if (!validateMobile(mobileNumber)) {
            return res
              .status(400)
              .send({ status: false, msg: "Please provide valid phone number" });
          }
          let alreadyUsedPhone = await user_registration.findOne({ where :{mobileNumber:mobileNumber}});
          if (alreadyUsedPhone) {
            return res.status(400).send({
              status: false,
              msg: "This phone number is already registerd",
            });
          }
          if (!email) {
            return res.status(400).send({ staus: false, msg: "Email is required" });
          }
          if (!validateEmail(email)) {
            return res
              .status(400)
              .send({ status: false, msg: "Please provide valid email" });
          }
          let alreadyUsedEmail = await user_registration.findOne({ where :{email:email}});
          if (alreadyUsedEmail) {
            return res
              .status(400)
              .send({ status: false, msg: "This email is already registerd" });
          }
          if (!password) {
            return res
              .status(400)
              .send({ staus: false, msg: "Password is required" });
          }
          if (password.length < 8 || password.length > 15) {
            return res.status(400).send({
              staus: false,
              msg: "Length of the password must be between 8 to 15 charaxters",
            });
          }
        
          return next();
        } catch (e) {
          res.status(500).send({ status: false, error: e.message });
        }
      },


//userLogin
      userLogin: async (req, res, next) => {
        try {
          let { email, password } = req.body;
    
          //Cant accept Empty Request
          if (!isvalidRequestBody(req.body)) {
            return res
              .status(400)
              .send({ status: false, msg: " cant accept empty Request" });
          }
          if (!validateEmail(email)) {
            return res
              .status(400)
              .send({ status: false, msg: "Please provide valid email" });
          }
    
          //Email && PassWord (required)
          if (!email || !password) {
            return res
              .status(400)
              .send({ status: false, msg: "Email and  Password is required" });
          }
         
    
          next();
        } catch (err) {
          res.status(500).send({ status: false, error: err.message });
        }
      },
      userUpdate: async (req, res, next) => {
        try {
          let data = req.body;
          if (!isvalidRequestBody(data)) {
            return res
              .status(400)
              .send({ statua: false, msg: `Request body can't be empty` });
          }
          if(data.email){
            if (!validateEmail(data.email)) {
                return res
                  .status(400)
                  .send({ status: false, msg: "Please provide valid email" });
              }
              let alreadyUsedEmail = await user_registration.findOne({ where :{email:data.email}});
              if (alreadyUsedEmail) {
                return res
                  .status(400)
                  .send({ status: false, msg: "This email is already registerd" });
              }
        }
        if(data.password){
            if (data.password.length < 8 || data.password.length > 15) {
                return res.status(400).send({
                  staus: false,
                  msg: "Length of the password must be between 8 to 15 charaxters",
                });
              }
            
        }
        if(data.mobileNumber){
            if (!validateMobile(data.mobileNumber)) {
                return res
                  .status(400)
                  .send({ status: false, msg: "Please provide valid phone number" });
              }
              let alreadyUsedPhone = await user_registration.findOne({ where :{mobileNumber:data.mobileNumber}});
              if (alreadyUsedPhone) {
                return res.status(400).send({
                  status: false,
                  msg: "This phone number is already registerd",
                });
              }
        }
        if(data.status){
            if (!isValidStatus(data.status)) {
                return res.status(400).send({
                  staus: false,
                  msg: "Status should be in  Active, Un_ACtive ",
                });
              }
        }
          next();
        } catch (e) {
          res.status(500).send({ status: false, error: e.message });
        }
      }
}


