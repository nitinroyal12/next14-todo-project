"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"


const homeLayout = ({ children }) => {
  const route = useRouter()
  const [toggle,settoggle] = useState(true)

  const handleLogout = ()=>{
    localStorage.clear()
    route.push("/")
    toast.success("Logout Successful")

  }

  return (
    
    
    <div className="bg-orange-100 min-h-screen w-full">
      <div className="fixed bg-white text-blue-800 px-10 py-1 z-10 w-full">
        <div className="flex items-center justify-between py-2 text-5x1">
          <div className="font-bold text-blue-900 text-xl">Todo App<span className="text-orange-600"> Dashboard</span></div>
          <div className="flex items-center text-gray-500">
            <div className="bg-center bg-cover relative bg-no-repeat rounded-full inline-block h-12 w-12 ml-2 cursor-pointer" style={{ backgroundImage: " url(https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg)" }} onClick={()=>settoggle(!toggle)}>
              <div className={`absolute ${toggle ? "hidden" : "flex"} top-full left-[-70px]  h-full py-2  items-center justify-center w-full`}>
                <button className=" bg-neutral-700 text-white font-bold text-xl px-4 rounded-lg py-2 hover:bg-green-600 hover:duration-500" onClick={handleLogout}>Logout</button>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row pt-24 px-10 pb-4">
        <div className="w-2/12 mr-6">
          <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4 h-full">
            <div className="hover:shadow-md hover:shadow-slate-800 hover:text-purple-500 dark:hover:text-blue-500 py-2 w-full group-active:scale-95 self-stretch pl-2 rounded-md flex items-center space-x-2 transition-all duration-200 cursor-pointer text-sm" >
              <Link href="/dashbord" className="font-QuicksandMedium text-lg font-bold">Dashboard</Link>
            </div>
            <div className="hover:shadow-md hover:shadow-slate-800 hover:text-purple-500 dark:hover:text-blue-500 py-2 w-full group-active:scale-95 self-stretch pl-2 rounded-md flex items-center space-x-2 transition-all duration-200 cursor-pointer text-sm" >
              <Link href="/tasks" className="font-QuicksandMedium text-lg font-bold">Task's</Link>
            </div>
          </div>


        </div>

        <div className="w-full ">
          {children}
        </div>

      </div>
    </div>
    
  )
}

export default homeLayout