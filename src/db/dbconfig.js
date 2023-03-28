module.exports={
    HOST:process.env.HOST,
    USER: "root",
    PASSWORD : process.env.DATABASE_PASSWORD,
    DB:"testing",
    dialect : 'mysql' , 
    pool:{
        max:5,
        min:1 ,
        acquire:300000,
        idle:10000
    }


}