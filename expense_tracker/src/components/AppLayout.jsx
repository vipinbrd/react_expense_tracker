import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export function AppLayout(){
    return <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    
    
    </>
}