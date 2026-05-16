import { create } from "zustand" 
import { persist } from "zustand/middleware"

const useProfileStore = create(
    persist(
        (set) => ({
            user: {
                name: "",
                email: "",
                acctype : "normal" ,
                id: ""
            },
            setProfile: (userData) => set({ user: userData }),
            clearProfile: () => set({ user: { name: "", email: "", acctype : "normal" ,id: ""  } })
        }),
        {
            name: "user-profile-storage", // name of the item in localStorage
        }
    )
)

export default useProfileStore;