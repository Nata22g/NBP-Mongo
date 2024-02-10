import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from 'react'


const RequiredAuth=({allowedRole})=> {
    const {user} =useAuth();
    const location=useLocation();

    console.log("dal ulazi u ovo", user);
    return(
       
        user?.tipKorisnika===allowedRole
        ? <Outlet/>     //bilo koji child komponentu ReqAuth-a
        : <Navigate to="/login" state={{from: location}} replace/>
    );
}

export default RequiredAuth;