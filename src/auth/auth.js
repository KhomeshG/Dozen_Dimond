const { parse } = require("dotenv");
const jwt = require("jsonwebtoken")
const db= require("../model/dbconfig")
const user_registration= db.user_registration

exports.authentication = function (req, res, next) {
    try {
      let tokenCheck = req.rawHeaders[1].replace("Bearer ", "");
  
      if (!tokenCheck) {
        return res
          .status(400)
          .send({ status: false, msg: "Token is required in bearer" });
      }
      //Verifying
  
      jwt.verify(tokenCheck, "demon_diamond", (err, decode) => {
        if (err) {
          let msg =
            err.message == "jwt expired"
              ? "Token is Expired !!! "
              : "Token is Invalid !!!";
          return res.status(401).send({ status: false, msg: msg });
        }
  
        req["decode"] = decode.userId;

        console.log(decode)
  
        next();
      });
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Server Error  authentication!!!",
        ErrMsg: err.message,
      });
    }
  };


exports.authorization = async function (req, res, next) {
    try {
      if (req.params) {
        
        let user= await user_registration.findByPk(parseInt(req.params.id))
        if (!user) {
          return res
            .status(400)
            .send({ status: false, msg: "Not a valid UserId" });
        }
        if (user.id == req.decode) {
          next();
        } else {
          return res
            .status(403)
            .send({ status: false, msg: "not Authorized User!!!" });
        }
      } else {
        return res
          .status(400)
          .send({ status: false, msg: "userId is require in params" });
      }
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Server Error authorization !!!",
        err: err.message,
      });
    }
  };

