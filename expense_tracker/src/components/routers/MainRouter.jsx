import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp } from "../SignUp";
import { Login } from "../Login";
import { AppLayout } from "../AppLayout";
import { Error } from "../Error";

export function  MainRouter(){
    const router=createBrowserRouter([{
         path:"/",
         element:<AppLayout/>,
         errorElement:<Error/>,
         children:[
            {
                index:true,
                element:<SignUp/>

            },
            {
                path:"signup",
                element:<SignUp/>
            },
            {
                path:'login',
                element:<Login/>
            }
         ]

    }])
    return <RouterProvider router={router}></RouterProvider>

}