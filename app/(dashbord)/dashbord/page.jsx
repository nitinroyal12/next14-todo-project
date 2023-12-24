"use client"
import { GetUser } from '@action/registeruser'
import { Gettask } from '@action/todo'
import Redirection from '@components/Redirection'
import React, { useEffect, useState } from 'react'




const page = () => {
    const email = localStorage.getItem("email")
    

    
    const [data11, setdata] = useState([])
    const [users, setusers] = useState([])
    const gettask = async () => {
        try {
            const res = await Gettask({email:email})
            if (res.status === "ok") {
                setdata(res.result)
            }

        } catch (err) {
            console.log(err);
        }
    }

    const getuser = async () => {
        try {
            const res = await GetUser()
            if (res.status === "ok") {
                setusers(res.result)
            }
        } catch (err) {
            console.log(err);
        }
    }
    const currentdate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayDate = `${year}-${month}-${day}`;
        return todayDate
    }

    const desiredDate = new Date(currentdate()); 

    const filteredData = data11.filter(item => {
        const createdAtDate = new Date(item.createdAt);
        return (
            createdAtDate.getUTCFullYear() === desiredDate.getUTCFullYear() &&
            createdAtDate.getUTCMonth() === desiredDate.getUTCMonth() &&
            createdAtDate.getUTCDate() === desiredDate.getUTCDate()
        );
    });

    const completed = filteredData.filter((item) => item.status === "Completed")
    const panding = filteredData.filter((item) => item.status === "Panding")


    useEffect(() => {
        gettask()
        getuser()
    }, [])
    return (
        <div className="w-full h-full">
            <div className="flex flex-row">
                <div className="bg-no-repeat bg-red-200 border border-red-300 rounded-xl w-7/12 mr-2 p-6" >
                    <p className="text-5xl text-indigo-900">Welcome to<br /><strong>My Todo App </strong></p>
                </div>

                <div className="bg-no-repeat bg-orange-200 border border-orange-300 rounded-xl w-5/12 ml-2 p-6" >
                    <p className="text-5xl text-indigo-900">Users <br /><strong>{users.length}</strong></p>
                </div>
            </div>
            <div className="flex flex-row h-64 mt-6">
                <div className="bg-white rounded-xl shadow-lg px-6 py-4 w-4/12">
                    <div className='bg-orange-400 w-full rounded-lg text-center font-bold py-4 text-2xl'>Today Created Tasks </div>
                    <div className=' mt-3 h-[120px] flex justify-center items-center font-bold text-8xl text-slate-700'>
                        {filteredData.length}
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg mx-6 px-6 py-4 w-4/12">
                    <div className='bg-yellow-400 w-full rounded-lg text-center font-bold py-4 text-2xl'>Today Panding Tasks</div>
                    <div className=' mt-3 h-[120px] flex justify-center items-center font-bold text-8xl text-yellow-700'>
                        {panding.length}
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg px-6 py-4 w-4/12">
                    <div className='bg-green-500 w-full rounded-lg text-center font-bold py-4 text-2xl'>Today Completed Tasks</div>
                    <div className=' mt-3 h-[120px] flex justify-center items-center font-bold text-8xl text-green-700'>
                        {completed.length}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Redirection(page)