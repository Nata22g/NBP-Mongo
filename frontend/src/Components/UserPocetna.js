import { useState, useContext, Fragment } from "react";
import useAuth from "../hooks/useAuth";
import { Box } from "@mui/material";
import Stanar from "./Stanar/Stanar";
import Direktor from "./Direktor/Direktor";
import Upravnik from "./Upravnik/Upravnik";
import StanarLayout from "./Stanar/StanarLayout";
import { Route,Routes } from "react-router-dom";
import DirektorLayout from "./Direktor/DirektorLayout";


const UserPocetna = () => {

    const { user } = useAuth();

    console.log(user)

    return (
        <Box>
            {/* <Korisnik/> */}
            {(user.tipKorisnika == 'Stanar' ) && 
            <Stanar />
            }
            {user.tipKorisnika == 'Direktor' && 
            <Direktor />
            }
            {user.tipKorisnika == 'Upravnik' && <Upravnik />}
        </Box>
    )

}

export default UserPocetna