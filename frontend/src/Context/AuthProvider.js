import { createContext,useState,useReducer,useMemo,useEffect } from "react";
import UserReducer from "./UserReducer";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { LoginSuccess, LoginStart, LoginFailure } from "./UserAction";
import { useCookies } from "react-cookie";

const defaultValue = {
  // user: JSON.parse(localStorage.getItem("user")) || null,
  user: null,
  ucitavaSe: true,
  error: null,
};

//create context se koristi za trenutnog usera
const AuthContext=createContext(defaultValue);


export const AuthProvider = ({children}) => {

    const axiosPrivate = useAxiosPrivate()
    const [state, dispatch] = useReducer(UserReducer, defaultValue);

    useEffect(() => {
      let userId = localStorage.getItem("userId")
      let token = localStorage.getItem("token")
      console.log("AuthProvider: "+userId)
      console.log("AuthProvider: "+token)

      const getUser = async () => {
          try {
              const res = await axiosPrivate.get('http://localhost:8080/api/auth/vratiKorisnikaPrekoTokena?userId=' + localStorage.getItem('userId'))
              console.log(res)
              if (res.data) {
                  dispatch(LoginSuccess(res.data))
                  localStorage.setItem('token', res.data.token)
                  document.cookie = 'token=' + res.data.refreshToken
              }
          }
          catch (err) {
              console.log(err)
              localStorage.clear()
              document.cookie = 'token=' + ''
              dispatch(LoginFailure())
          }
      }

      if (token && token.length && userId) {
          dispatch(LoginStart())
          getUser()
      } else {
          dispatch(LoginFailure())
          document.cookie = 'token=' + ''
      }

  }, [])

 //children su komponente koje ce biti ugnjezdene
    return (
    <AuthContext.Provider value={{
         user: state.user,
         ucitavaSe: state.ucitavaSe,
         error: state.error,
         dispatch,            //kod NADE je dispatch
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext ;
