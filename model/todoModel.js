import { Schema,model,models } from "mongoose";

const todo = new Schema({
    task:{
        type:String,
        required:true,
        allowNull:true
    },
    status:{
        type:String,
        required:true,
        allowNull:true
    },
    email:{
        type:String,
        required:true,
        allowNull:true
    }
},{timestamps:true})

const todolist = models.todolist || model("todolist",todo)
export default todolist;