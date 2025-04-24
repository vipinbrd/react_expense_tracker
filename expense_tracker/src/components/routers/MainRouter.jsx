import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp } from "../SignUp";
import { Login } from "../Login";
import { AppLayout } from "../AppLayout";
import { Error } from "../Error";
import { Profile } from "../Profile";
import { NavBar } from "../NavBar";
import { ForgotPassword } from "../ForgotPassword";
import { AuthStore } from "../store/AuthContext";
import { useContext } from "react";
import { ProtectedRoute } from "../ProtectedRoute";

export function  MainRouter(){
     const{userInfo,setUserInfo}=useContext(AuthStore)
     const loggedIn=Object.keys(userInfo).length>0;
    
    const router=createBrowserRouter([{
         path:"/",
         element:<SignUp/>,
         errorElement:<Error/>,
         children:[
            {
                index:true,
                element:<SignUp/>

            },
            {
                path:"signup",
                element:<SignUp/>
            }
           
         ]

    }
,{

        path:'login',
        element:<Login/>
    
}
,{
    path:"profile",
    element:<Profile/>
},
{
    path:'home',
    element:<ProtectedRoute><NavBar/></ProtectedRoute>
},
{
    path:'forget',
    element:<ForgotPassword/>
}
])
    return <RouterProvider router={router}></RouterProvider>

}