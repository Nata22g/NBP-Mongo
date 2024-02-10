import React from "react";
import useAuth from "../../hooks/useAuth";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import slika from '../../Assets/modern-office-desk-composition-with-technological-device.jpg';

export default function IzmeniDirektora() {
  const { user, dispatch } = useAuth();
  const [isSubmit, setIsSubmit] = useState(false);
  const [korisnik, setKorisnik] = useState({
    ime: user.ime,
    prezime: user.prezime,
    username: user.username,
    email: user.email,
    registrovaniKorisnikId: user.registrovaniKorisnikId,
    password: user.password,
    direktorId: user.direktorId,
    telefon: user.telefon,
    refreshToken: user.refreshToken
  });

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKorisnik({ ...korisnik, [name]: value });
  };


  
  useEffect(() => {
    console.log(korisnik);
  }, [korisnik]);


  const IzmeniDirektora = async (e) => {
    try {
      console.log("usao ", user.registrovaniKorisnikId);
      // const zahtev = {
      //   url:
      //   `http://localhost:8080/api/stanar/azurirajNalogStanar/`+user.registrovaniKorisnikId,
      // };
      const response = await axiosPrivate.put(`http://localhost:8080/api/direktor/azurirajNalogDirektor/` + user.registrovaniKorisnikId, korisnik);
      dispatch({ tip: "UPDATE_USER", payload: { ...user, ...korisnik } })
      setIsSubmit(true);
    } catch (err) {
      alert("Doslo je do greske");
      setKorisnik({});
    }
  };

  return (
    <div
      className="Dodaj"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage: `url(${slika})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: "fixed",        
        backgroundPosition: "center"
      }}
    >
      <div className="belina">
        <h2>Izmeni svoje podatke:</h2>
        <div
          className="e-disabled"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <p className="tekst">Ime</p>
          <input
            className="input"
            type="text"
            name="ime"
            value={korisnik.ime}
            onChange={handleChange}
          ></input>
          <p className="tekst">Prezime</p>
          <input
            className="input"
            type="text"
            name="prezime"
            value={korisnik.prezime}
            onChange={handleChange}
          ></input>
          <p className="tekst">Email</p>
          <input
            className="input"
            type="text"
            name="email"
            value={korisnik.email}
            onChange={handleChange}
          ></input>
          <p className="tekst">Username</p>
          <input
            className="input"
            type="text"
            name="username"
            value={korisnik.username}
            onChange={handleChange}
          ></input>
          <p className="tekst">Password</p>
          <input
            className="input"
            type="password"
            name="password"
            value={korisnik.password}
            onChange={handleChange}
          ></input>
          <p className="tekst">Telefon</p>
          <input
            className="input"
            type="text"
            name="pol"
            value={korisnik.telefon}
            onChange={handleChange}
          ></input>
          <div>
            <Button
             className="m-2 mt-3"
              variant="secondary"
              onClick={() => IzmeniDirektora()}
            >
              Izmeni
            </Button>
            <Button
             className="m-2 mt-3"
              variant="secondary"
              onClick={() => navigate("/Direktor")}
            >
              Nazad
            </Button>
            {isSubmit ? (
                        <p className="upozorenja">Izmena podataka je uspešno obavljena!</p>
                    ) : ""}

          </div>
        </div>
      </div>
    </div>
  );
}
