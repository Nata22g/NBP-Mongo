import { useContext } from "react";
import AuthContext  from "../Context/AuthProvider";    //ovo nase sto je kreirano
import React from 'react'


const useAuth = () =>
{
    return useContext(AuthContext);
}

export default useAuth;
