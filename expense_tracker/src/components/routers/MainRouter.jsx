import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp } from "../SignUp";
import { Login } from "../Login";
import { AppLayout } from "../AppLayout";
import { Error } from "../Error";
import { Profile } from "../Profile";
import { NavBar } from "../NavBar";

export function  MainRouter(){
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
    element:<NavBar/>
}
])
    return <RouterProvider router={router}></RouterProvider>

}