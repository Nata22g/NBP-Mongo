
import React from "react";
import useAuth from "../../hooks/useAuth";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

import slika from '../../Assets/IzmeniUpravnika2.jpg';

export default function IzmeniUpravnika() {
  const { user, dispatch } = useAuth();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const podaci = {  
    ime: "",
    prezime:"",
    username: user.username,
    email: "",
    registrovaniKorisnikId: user.registrovaniKorisnikId,
    password: user.password,
    direktorId: user.direktorId,
    telefon: "",
    refreshToken: user.refreshToken};
  const [korisnik, setKorisnik] = useState(podaci);
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKorisnik({ ...korisnik, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(korisnik));
    setIsSubmit(true);

};

useEffect(() => {
  console.log("iz useEffect: ");
  console.log(formErrors);
  if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(korisnik);
      IzmeniUpravnika();
      console.log("uspešno")
  }
  else {
      console.log("nije uspešno")
  }
}, [formErrors]);
 // useEffect(() => {
 //   console.log(korisnik);
 // }, [korisnik]);

 const validate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regex2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gmi;
  if (!values.ime) {
      errors.ime = "Obavezno polje!";
  }
  if (!values.prezime) {
      errors.prezime = "Obavezno polje!";
  }
  
  if (!values.telefon) {
    errors.telefon = "Obavezno polje";
} else if (!regex2.test(values.telefon)) {
    errors.telefon = "Format nije odgovarajući!";
}
if (!values.email) {
  errors.email = "Obavezno polje!";
}else if (!regex.test(values.email)) {
  errors.email = "Format nije odgovarajući!";
}
 
  
  return errors;
};

const IzmeniUpravnika = async (e) => {
  try {
    console.log("usao ", user.registrovaniKorisnikId);
    // const zahtev = {
    //   url:
    //   `http://localhost:8080/api/stanar/azurirajNalogStanar/`+user.registrovaniKorisnikId,
    // };
    const response = await axiosPrivate.put(`http://localhost:8080/api/upravnik/azurirajNalogUpravnik/` + user.registrovaniKorisnikId, korisnik);
    dispatch({ tip: "UPDATE_USER", payload: { ...user, ...korisnik } })
   
  } catch (err) {
    alert("Doslo je do greske");
  //  setKorisnik({});
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
      <form className="" onSubmit={handleSubmit} >
                <h2>Izmeni svoje podatke:</h2>

                <div className="forma" >
                <div className="field">
                        <label className='tekst'>Ime</label>
                        <br>
                        </br>
                        <input className='input'
                            type="text"
                            name="ime"
                            placeholder={user.ime}
                            value={korisnik.ime}
                            onChange={handleChange}
                        />
                    </div>
                    < p className="upozorenja">{formErrors.ime}</p>
                    <div className="field">
                        <label className='tekst'>Prezime</label>
                        <br>
                        </br>
                        <input className='input'
                            type="text"
                            name="prezime"
                            placeholder={user.prezime}
                            value={korisnik.prezime}
                            onChange={handleChange}
                        />
                    </div>
                    < p className="upozorenja">{formErrors.prezime}</p>

                    <div className="field">
                        <label className='tekst'>E-mail</label>
                        <br>
                        </br>
                        <input className='input'
                            type="email"
                            name="email"
                            placeholder={user.email}
                            value={korisnik.email}
                            onChange={handleChange}
                        />
                    </div>
                    < p className="upozorenja">{formErrors.email}</p>

                    <div className="field">
                        <label className='tekst'>Korisničko ime</label>
                        <br>
                        </br>
                        <input className='input'
                            type="text"
                            name="username"
                            disabled={true}
                            placeholder="korisničko ime"
                            value={korisnik.username}
                            onChange={handleChange}
                        />
                    </div>
                    
                    
                    <div className="field">
                        <label className='tekst'>Telefon</label>
                        <br></br>
                        <input className='input'
                            type="tel"
                            name="telefon"
                            placeholder={user.telefon}
                            value={korisnik.telefon}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="upozorenja">{formErrors.telefon}</p>

                    <button className="zeleno-dugme" variant="secondary">Izmeni</button>
                    <button className="zeleno-dugme" variant="secondary"  onClick={() =>navigate("/Upravnik")}>Nazad</button>


                    {Object.keys(formErrors).length === 0 && isSubmit ? (
                        <p className="upozorenja">Izmena podataka je uspešno obavljena!</p>
                    ) : ""}


                </div>
            </form>
    </div>
  );
}
