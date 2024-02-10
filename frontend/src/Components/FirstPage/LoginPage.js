import React from "react";
import { useEffect, useRef, useState } from "react";
import { LoginMetoda } from "../Fetch";
import {
  LoginSuccess,
  LoginFailure,
  LoginStart,
} from "../../Context/UserAction.js";
import { useNavigate, Link, useLocation } from "react-router-dom";
import videoBg from "../../Assets/bg.mp4";
import useAuth from "../../hooks/useAuth"; //ovo ce da poziva i useContext i useAuth
import axios from "axios";

//const LOGIN_URL='/auth'; //slaze se sa backend-om

const LoginPage = () => {
  //useAuth cemo da korisimo u drugim delovima koda
  const { user,ucitavaSe, error, dispatch } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const emailRef = useRef();
  const errRef = useRef();

  const [tipK,setTipK]=useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  /*Fokus na input polje email*/
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  /*Praznjenje errorPoruke ako se email ili password promeni*/
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //response je server odgovor na post, sta vraca
    await axios.post("http://localhost:8080/api/auth/login", //post za http.../auth
        {'username': username, 'password': password}, //api ocekuje email i password
      //  {
      //    //objekat
      //   // headers: { "Content-Type": "application/json" },
      //    //withCredentials:true
      //  }
      )
      .then((p) => {
        if (p.status === 200) {

          console.log(p.data);
          dispatch(LoginSuccess(p.data));
          localStorage.setItem("token", p.data?.token);

          let userId = ''
                    if (p.data?.stanarId)
                        userId = p.data?.stanarId
                    else if (p.data?.direktorId)
                        userId = p.data.direktorId
                    else if (p.data?.upravnikId)
                        userId = p.data.upravnikId

                    localStorage.setItem("userId", userId)
                    document.cookie = 'token=' + p.data.refreshToken

          setUsername("");
          setPassword("");
          const str="/"+p.data?.tipKorisnika;
navigate(str);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 404) {
          setErrMsg("Ne postoji takav korisnik");
        } else if (error?.response?.status === 400) {
          setErrMsg("Nedostaje Email ili Password");
        } else if (!error?.response) {
          setErrMsg("Nema Serverskog odgovora");
        } else if (error?.response?.status === 401) {
          setErrMsg("Neautorizovan pristup");
        } else {
          setErrMsg("Neuspešan log in");
        }
        errRef.current.focus();
      });

    //  //console.log(JSON.stringify(response?.data));
    //  console.log((response?.data));
    //  console.log((response));
    //  //console.log(JSON.stringify(response));
    //  const korisnikId=response?.data?.registrovaniKorisnikId;
    //  const ime=response?.data?.ime;
    //  const prezime=response?.data?.prezime;
    //  const telefon=response?.data?.telefon;
    //  const tipKorisnika=response?.data?.tipKorisnika;
    //  const accessToken=response?.data?.token;
    //  const refreshToken=response?.data.refreshToken;
    //  if (tipKorisnika=='Stanar')
    //  {
    //    const brStana=response?.data?.brStana;
    //    const stanarId=response?.data?.stanarId;
    //    const dugovanje=response?.data?.dugovanje;
    //    const zgrada=response?.data?.zgrada;
    //    const brUkucana=response?.data?.brojUkucana;
    //    setAuth({korisnikId,ime,prezime,username,password,telefon,tipKorisnika,brStana,stanarId,dugovanje,zgrada,brUkucana,accessToken,refreshToken});
    //  }
    //else if (tipKorisnika=='Direktor')
    //{
    //  const direktorId=response?.data?.direktorId;
    //  setAuth({korisnikId,ime,prezime,username,password,telefon,tipKorisnika,direktorId,accessToken,refreshToken});
    //
    //}
    //else if (tipKorisnika=='Saradnik')
    //{
    //  const saradnikId=response?.data?.saradnikId;
    //  const imeFirme=response?.data?.imeFirme;
    //  const direktorId=response?.data?.direktorId;
    //  setAuth({korisnikId,ime,prezime,username,password,telefon,tipKorisnika,direktorId,saradnikId,imeFirme,accessToken,refreshToken});
    //
    //}
    //else if (tipKorisnika=='Upravnik')
    //{
    //  const upravnikId=response?.data?.upravnikId;
    //  const direktorId=response?.data?.direktorId;
    //  setAuth({korisnikId,ime,prezime,username,password,telefon,tipKorisnika,direktorId,upravnikId,accessToken,refreshToken});
    //
    //}
    //
    //}
    //  catch(err)
    //  {
    //    if(!err?.response)  //ako uopste nema response-a
    //    {
    //      setErrMsg('Nema Serverskog odgovora');
    //    }
    //    else if (err.response?.status === 400) {
    //      setErrMsg('Nedostaje Email ili Password');
    //  } else if (err.response?.status === 401) {
    //      setErrMsg('Neautorizovan pristup');
    //  } else {
    //      setErrMsg('Neuspešan log in');
    //  }
    //  errRef.current.focus();
    //  }
    //
  };

  return (
    <div className="loginPage">
      {/*Video*/}
      <div className="overlay"></div>
      <video src={videoBg} autoPlay loop muted />
      {/*LogInBox*/}
      <div className="content">
        <div className="centerBox">
          {/*Error message display*/}
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <label htmlFor="email">Username</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                value={username}
                autoComplete="off"
                ref={emailRef}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-success">Log In</button>
          </form>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default LoginPage;
