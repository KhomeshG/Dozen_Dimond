const dbConfig= require("../db/dbconfig")

const {Sequelize , DataTypes}= require('sequelize')


const sequelize = new Sequelize(
    dbConfig.DB , 
    dbConfig.USER, 
    dbConfig.PASSWORD ,{
    host : dbConfig.HOST,
    dialect: dbConfig.dialect,
  
    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle,

    }
})

sequelize.authenticate()
.then(()=>{
    console.log("MYSQL_Data is Conneted")
})
.catch((err)=>{
    console.log(err)
})

let db={}

db.Sequelize= Sequelize
db.sequelize= sequelize

db.user_registration= require("./user/userSchema.js")(sequelize , DataTypes)
db.user_login= require("./user/userSchema.js")(sequelize , DataTypes)


db.sequelize.sync({force:false})
.then(()=>{
    console.log("Yes We Sync")
})
.catch((err)=>{
    console.log(err)
})

module.exports=db