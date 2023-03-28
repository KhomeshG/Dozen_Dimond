module.exports =(sequelize, DataTypes)=>{

    const user_registration= sequelize.define("user_registration ", {
        firstName:{
            type : DataTypes.STRING,
            allowNull : false
        },
        lastName:{
            type : DataTypes.STRING,
            allowNull : false
        },
        email:{
            type : DataTypes.STRING,
            unique: true,
            allowNull : false
        },
        password:{
            type : DataTypes.STRING,
            allowNull : false
        },
        mobileNumber:{
            type : DataTypes.STRING,
            unique: true,
            allowNull : false
        },
        status:{
            type : DataTypes.ENUM("Active", "Un_ACtive"),
           defaultValue: "Active",
            allowNull : false
        },
    },{
        timestamps :true
    })

    return user_registration

}

