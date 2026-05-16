'use client'
import axios from 'axios'
import useProfileStore from '../store/store'
export default function Logout() {
    const clearProfile = useProfileStore((state) => state.clearProfile)

    const handleLogout = async ()=>{
        const logout = await axios.get('/api/auth/logout' , {
            withCredentials : true 
        })
        clearProfile()
    }

  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
