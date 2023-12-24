"use client"

import { redirect, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Redirection(Components) {
  return function Redirection(prop) {
    const router = useRouter()
    const token = localStorage.getItem("token")
    useEffect(() => {
      if (!token) {
         redirect("http://localhost:3000")
      }

      

    }, [token, router])
    if (!token) {
      return null
    }

    return <Components {...prop} />

  }

}