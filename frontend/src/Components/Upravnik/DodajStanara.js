import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import slika from '../../Assets/saradnik2.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function DodajStanara() {

  const { auth, setAuth } = useAuth();

  const pom = useLocation();
  console.log("pom", pom);
  console.log(pom.state)
  const idZgrade = pom.state.id;
  console.log("id Zgrade iz dodajStanara ", idZgrade);
  const lokacijaZ = pom.state.lokacija;
  const axiosPrivate = useAxiosPrivate();
  const [listaSlobodnihStanova, setStanovi] = useState(null);
    
  const { user, dispatch } = useAuth();

  const podaci = { username: "", password: "", tipKorisnika: "Stanar", ime: "", prezime: "", brStana: "", brojUkucana: "", zgrada: lokacijaZ };
  const [formValues, setFormValues] = useState(podaci);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

  };

  useEffect(() => {
    preuzmiSlobodneStanove();
  }, [])

  useEffect(() => {
    console.log("iz useEffect: ");
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      saveData();
      preuzmiSlobodneStanove();
      console.log("uspešno")
      setFormValues(podaci);
    }
    else {
      console.log("nije uspešno")
    }
  }, [formErrors]);

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
    if (!values.username) {
      errors.username = "Obavezno polje";
    } 
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    if (!values.brStana) {
      errors.brStana = "Obavezno polje!";
    } else if (values.brStana < 1) {
      errors.brStana = "Mora da bude pozitivan broj!";
    }

    if (!values.brojUkucana) {
      errors.brojUkucana = "Obavezno polje!";
    } else if (values.brojUkucana < 1) {
      errors.brojUkucana = "Mora da bude pozitivan broj!";
    }

    //if (!values.telefon) {
    //  errors.telefon = "Obavezno polje";
    //} else if (!regex2.test(values.telefon)) {
    //  errors.telefon = "Format nije odgovarajući!";
    //}
    //if (!values.email) {
    //  errors.email = "Obavezno polje";
    //} else if (!regex.test(values.email)) {
    //  errors.email = "Format nije odgovarajući!";
    //}
    return errors;
  };

  const saveData = async () => {
    try {
      console.log('MUNEEEEEEEEM')
      console.log(formValues)
      const response = await axiosPrivate.post(`http://localhost:8080/api/stanar/dodajStanara`, formValues);

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }


  const preuzmiSlobodneStanove = async () => {
    try {
        const response = await axiosPrivate.get(`http://localhost:8080/api/zgrada/prikaziSlobodneStanoveZgrade/${idZgrade}`,
            
        );
        setStanovi(response.data);
        console.log("slobodni stanovi ", response?.data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }

}

  return (



    <div className="Dodaj" style={{
      backgroundImage: `url(${slika})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',

    }}>
      <form className="" onSubmit={handleSubmit} >

        <h2>Dodaj novog stanara na lokaciju: {lokacijaZ}  </h2>

        <div className="forma" >
          <div className="field">
            <label className='tekst'>Ime</label>
            <br>
            </br>
            <input className='input'
              type="text"
              name="ime"
              placeholder="ime"
              value={formValues.ime}
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
              placeholder="prezime"
              value={formValues.prezime}
              onChange={handleChange}
            />
          </div>
          < p className="upozorenja">{formErrors.prezime}</p>
          <div className="field">
            <label className='tekst'>Korisničko ime</label>
            <br>
            </br>
            <input className='input'
              type="email"
              name="username"
              placeholder="korisničko ime"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          < p className="upozorenja">{formErrors.username}</p>
          <div className="field">
            <label className='tekst'>Šifra</label>
            <br>
            </br>
            <input className='input'
              type="password"
              name="password"
              placeholder="šifra"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          < p className="upozorenja">{formErrors.password}</p>
          <div className="field">
            <label className='tekst'>Broj stana</label>
            <br>
            </br>
           
            <select

              className="custom-select" defaultValue="default"
              name="brStana" onChange={handleChange}>
              <option className='text-center mb-3' >Izaberi slobodan stan</option>
              {listaSlobodnihStanova ? (listaSlobodnihStanova.map((item, i) => {
                return (<option key={i} value={item} >{item} </option>);

              })) : (<option className='text-center mb-3'>Nema slobodnih stanova</option>)}


            </select>
            < p className="upozorenja">{formErrors.brStana}</p>
          </div>
          <div className="field">
            <label className='tekst'>Broj ukućana</label>
            <br>
            </br>
            <input className='input'
              type="number"
              name="brojUkucana"
              placeholder="broj ukućana"
              value={formValues.brojUkucana}
              onChange={handleChange}
            />
          </div>
          < p className="upozorenja">{formErrors.brojUkucana}</p>


          <button className="dugme">Dodaj</button>
          <button className="dugme" onClick={() =>  navigate("/PregledStanara", { state: { id: idZgrade, lokacija: lokacijaZ } })}>Nazad</button>


          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <p className="upozorenja">Dodavanje stanara je uspešno obavljeno!</p>
          ) : ""}


        </div>
      </form>
    </div>


  )
}
