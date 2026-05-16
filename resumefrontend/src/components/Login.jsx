"use client"

import { useState , useEffect } from "react"
import axios from "axios"


export default function Login() {
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

  const handelLogin = async (e)=>{
    e.preventDefault()

    try{
      const login = await axios.post('/api/auth/login' ,{
        email : email ,
        password : password
      }, {
        withCredentials: true
      })
      
      console.log(login)
      if(login.status == 200){
        setEmail("")
        setPassword("")
      }

    }catch(err){
      console.log(err)

    }
  }

  return (
    <div>
      <form onSubmit={handelLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
