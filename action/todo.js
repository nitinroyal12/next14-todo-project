"use server"

const { connect } = require("@Database/connection")
const { default: todolist } = require("@model/todoModel")

export const SendTask = async (data) => {
    console.log(data);
    try {
        await connect()
        await todolist.create(data)
        return { status: "ok", message: "Tesk Created successful" }
    } catch (err) {
        return { status: "err", message: "server error" }
    }
}


export const Gettask = async ({email}) => {
    
    try{
        await connect()
        const data =await todolist.find({email:email})
        return {status:"ok",result:data}

    } catch(err){
        return {status:"err", message:"this is get task error"}
    }
}


export const deletetask = async(id)=>{
    try{
        await connect()
        const find =  await todolist.findOne({_id:id})
        if(!find){
            return {status:"err",message:"Data not found"}
        }
         const taskdelet = await todolist.findByIdAndDelete(id)
        return {status:"ok",message:`${taskdelet.task} Task deleted`}
    }catch(err){
        return {status:"err",message:"this is task delete error"}
    }
}


export const completetask = async(data)=>{
    try{
        await connect()
        const find = await todolist.findOne({_id:data.id})
         find.status = data.status
        await find.save()
        return {status:"ok",message:"task completed successful"}
    } catch(err){
        return {status:"err",message:"this is completetask error"}
    }
}


export const edittask = async(data)=>{
    try{
        await connect()
        const find = await todolist.findOne({_id:data.id})
        find.task = data.task
        await find.save()
        return {status:"ok",message:"Edit task Successful"}
    }catch(err){
        return {status:"err",message:"this is edittask error"}
    }
}