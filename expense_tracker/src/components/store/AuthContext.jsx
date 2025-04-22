import { createContext, useState } from "react"

export const AuthStore=createContext({})
export function AuthContext({children}){
    const userData=JSON.parse(localStorage.getItem("userInfo"))||{}
    const [userInfo,setUserInfo]=useState(userData);

    return  <AuthStore.Provider value={{userInfo,setUserInfo}}>{children}</AuthStore.Provider>
     



}