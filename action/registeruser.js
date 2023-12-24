"use server"

const {connect} = require("@Database/connection")
const { default: UserModel } = require("@model/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



export const Submitdata =async (data)=>{
    
    try{
        await connect()
        const finduser = await UserModel.findOne({email:data.email})
        if(finduser){
            return {status:"err",message:"you are Already exist"}  
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        await UserModel.create({...data,password:hashedPassword})
        return {status:"ok",message:"user created successful"}
    } catch(err){
        
        return {status:"err",message:"server error please try again"}
    }
}

export const loginuser = async(data)=>{
    try{
        await connect()
        const finduser = await UserModel.findOne({email:data.email})
        if(!finduser){
            return {status:"err",message:"User not found"}
        }
        const checkpass = bcrypt.compareSync(data.password,finduser.password)
        if(!checkpass){
            return {status:"err",message:"Wrong Password"}
        }
        const token = jwt.sign({status:"ok",message:"Login successful"},process.env.Secret_kay,{ expiresIn: '1d' })
        return {status:"ok",message:"Login successful" ,email:finduser.email,token:token}
    }catch(err){
        return {status:"err",message:"this is an server error"}
    }
}

export const GetUser = async()=>{
    try{
        await connect()
        const data = await UserModel.find({})
        return {status:"ok",result:data}

    }catch (err) {
        return {status:"err",message:"this message is getuser"}
    }
}