"use client"

import { useState , useEffect } from "react"
import axios from "axios"


export default function Register() {

  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

  const handleRegister = async (e)=>{
    e.preventDefault()
    try{
        const register = await axios.post('/api/auth/register' ,{
          name : name ,
          email : email ,
          password : password
        })
        if(login.status == 200){
            setName("")
            setEmail("")
            setPassword("")
        }
        console.log(register)

    }catch(err){
        console.log(err)
    }

  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
