"use client"

import { useState , useEffect } from "react"
import axios from "axios"
import useProfileStore from '../store/store'
import Link from "next/link"
import { useRouter } from 'next/navigation'


export default function Login() {
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [name , setName] = useState("")
  const setProfile = useProfileStore((state) => state.setProfile)

  const router = useRouter()

   

  const handelLogin = async (e)=>{
    e.preventDefault()

    try{
      const login = await axios.post('/api/auth/login' ,{
        email : email ,
        password : password
      }, {
        withCredentials: true
      })
      setProfile({
        name: login.data.user.name,
        email: login.data.user.email,
        id: login.data.user._id
      })

      
      console.log(login)
      if(login.status == 200){
        setEmail("")
        setPassword("")
      }
      router.push('/dashboard') 

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
