import{ Schema, model, models } from "mongoose";
import bcrypt from "bcrypt"

const user = new Schema({
    name:{
        type:String,
        required:true,
        allowNull:true
    },
    email:{
        type:String,
        required:true,
        allowNull:true
    },
    password:{
        type:String,
        allowNull:true
    }
},{timestamps:true})

user.pre("save", async function(next){
    const data = this;

    try{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(data.password,salt)
        data.password = hash;
        next();
    } catch (err){
        next(err)
    }

})

const UserModel = models.UserModel || model("UserModel",user)

export default UserModel;