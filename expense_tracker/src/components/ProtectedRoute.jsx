import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({children}){
    const navigate=useNavigate()
    const [isloading,setIsLoading]=useState(true);
    console.log("hi check")
 useEffect(()=>{
    const loggedIn=JSON.parse(localStorage.getItem("userInfo"));
    console.log(loggedIn)
   
    if(!loggedIn){
       navigate("/login")
       console.log("hi there ")
    }
    else{ 
    setIsLoading(false)}

 },[])
   
 if(isloading){
    return <p>Loading.....</p>
 }
     
 return children;
  
       

}