"use client"

import { useEffect, useState } from "react"
import { Gettask, SendTask, completetask, deletetask, edittask } from "@action/todo"
import { toast } from "react-toastify"
import Redirection from "@components/Redirection"

const page = () => {

    const email = localStorage.getItem("email")
    const [modal1, setmodal1] = useState(false)
    const [check, setcheck] = useState(false)
    const [edit, setedit] = useState(false)
    const [tasks, settasks] = useState([])
    const [getid,setgetid] = useState("")
    const [data, setdata] = useState({
        task: "",
        status: "Panding",
        email:email
    })
    const panding = tasks.filter((item)=>item.status === "Panding")
    const complete = tasks.filter((item)=>item.status === "Completed")
    const handlesave = async () => {

        try {
            if (data.task === "") {
                toast.error("Task field required")
            } else {
                const res = await SendTask(data)
                if (res.status === "ok") {
                    toast.success(res.message)
                    setmodal1(false)
                    gettask()
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const gettask = async () => {
        try {
            const res = await Gettask({email:email})
            settasks(res.result)
        } catch (err) {
            console.log(err);
        }
    }
    const handledelete = async (id) => {
        try {
            const res = await deletetask(id)
            if (res.status === "ok") {
                toast.success(res.message)
                gettask()
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handlecheck = async (id) => {
        try {
            const res = await completetask({
                id: id,
                status: "Completed"
            })
            if (res.status === "ok") {
                toast.success(res.message)
                gettask()
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleedit = async () => {
        
        try {
            const res = await edittask({ task: data.task, id:getid })
            if(res.status === "ok"){
                toast.success(res.message)
                setmodal1(false)
                gettask()
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        gettask()
        
    }, [])

    return (

        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">

            <div className="w-full text-center mx-auto flex justify-around">

                <button
                    className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
                    completed : {complete.length}
                </button>
                <button
                    className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline">
                    Panding : {panding.length}
                </button>

                <button
                    className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline" onClick={() => { setmodal1(true); setedit(false) }}>
                    Add Task
                </button>
            </div>

            <table className="w-full table-fixed">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Sr. No.</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Task</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Created At</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Completed At</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Status</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {
                        tasks.map((item, index) => {

                            const dateString = item.createdAt;
                            const dateObject = new Date(dateString);
                            const year = dateObject.getFullYear();
                            const month = dateObject.getMonth() + 1;
                            const day = dateObject.getDate();
                            const hours = dateObject.getHours();
                            const minutes = dateObject.getMinutes();
                            const formattedDateTime = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;


                            const dateString1 = item.updatedAt;
                            const dateObject1 = new Date(dateString1);
                            const year1 = dateObject1.getFullYear();
                            const month1 = dateObject1.getMonth() + 1;
                            const day1 = dateObject1.getDate();
                            const hours1 = dateObject1.getHours();
                            const minutes1 = dateObject1.getMinutes();
                            const formattedDateTime1 = `${year1}-${month1 < 10 ? '0' + month1 : month1}-${day1 < 10 ? '0' + day1 : day1} ${hours1 < 10 ? '0' + hours1 : hours1}:${minutes1 < 10 ? '0' + minutes1 : minutes1}`;

                            return (
                                <tr>
                                    <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                                    <td className={`py-4 px-6 border-b border-gray-200 ${item.status === "Completed" ? "line-through" : ""}`}><input type="checkbox" value={check} disabled={item.status === "Completed" ? true : false} checked={item.status === "Completed" ? true : false} onChange={(e) => {
                                        setcheck(!check)
                                    }} onClick={() => handlecheck(item._id)} /> {item.task}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{formattedDateTime}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{item.status === "Completed" ? formattedDateTime1 : ""}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        <span className={`${item.status === "Completed" ? "bg-green-500" : "bg-yellow-400"} text-white py-1 px-2 rounded-full text-xs`}>{item.status}</span>
                                    </td>
                                    <td className="py-4 px-6 border-b  border-gray-200">
                                        <button className={` ${item.status === "Completed" ? "bg-gray-400" : "bg-green-500"} text-white py-1 px-2 rounded-full text-xs mr-2 cursor-pointer`} disabled={item.status === "Completed" ? true : false} onClick={() => { setgetid(item._id);
                                            setedit(true);
                                            setmodal1(true)
                                        }}>Edit</button>
                                        <button className="bg-red-500 text-white py-1 px-2 rounded-full text-xs cursor-pointer" onClick={() => handledelete(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }




                </tbody>
            </table>
            {/* modal started here  */}
            {modal1 ? (<div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center`}>


                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

                    <div className="modal-content py-4 text-left px-6">
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-2xl font-bold">{edit ? "Edit task" : "Add New Task"}</p>

                        </div>
                        <input type="text" placeholder="enter task" className="border-2 h-10 w-full rounded-lg px-3" autoFocus onChange={(e) => setdata((prev) => ({ ...prev, task: e.target.value }))} />

                        <div className="mt-4 flex justify-end">
                            <button className="modal-close px-4 bg-gray-100 p-3 rounded-lg text-black hover:bg-gray-200" onClick={() => setmodal1(false)}>Cancel</button>

                            {edit ? <button className="px-4 bg-purple-500 p-3 ml-3 rounded-lg text-white hover:bg-purple-400" onClick={handleedit}>Edit</button> :
                                <button className="px-4 bg-purple-500 p-3 ml-3 rounded-lg text-white hover:bg-purple-400" onClick={handlesave}>Save</button>}
                        </div>
                    </div>
                </div>

            </div>) : null}

        </div>
    )
}

export default Redirection(page)