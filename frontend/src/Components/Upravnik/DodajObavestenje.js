import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import slika from '../../Assets/saradnik2.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Zgrade from './Zgrade';

export default function DodajObavestenje() {

    const axiosPrivate=useAxiosPrivate();

    const { user, dispatch } = useAuth();

    const pom = useLocation();
    const idZgrade = pom.state;
    console.log(idZgrade);
    const ime = user.ime;
    const prezime = user.prezime;
    const podaci = { autorIme: { ime }, autorPrezime: { prezime }, naslov: "", zgrada: { idZgrade }, opis: "" };
    const [formValues, setFormValues] = useState(podaci);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setFormErrors(validate(formValues));
    //     setIsSubmit(true);

    // };
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            saveData();
            console.log("uspešno");
          } else {
            console.log("nije uspešno");
          }
      };

     useEffect(() => {
         console.log("iz useEffect: ");
         if (Object.keys(formErrors).length === 0 && isSubmit) {
             saveData();
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
        if (!values.autorIme) {
            errors.ime = "Obavezno polje!";
        }
        if (!values.autorPrezime) {
            errors.prezime = "Obavezno polje!";
        }
        if (!values.opis) {
            errors.opis = "Obavezno polje!";
        }

        if (!values.naslov) {
            errors.naslov = "Obavezno polje";

        }


        return errors;
    };

    const saveData=async()=> {
        try {
            const response = await axiosPrivate.post(`http://localhost:8080/api/obavestenje/dodajObavestenjeUpravnik/`+user.upravnikId+`/`+idZgrade, formValues);
            
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
                <h2>Dodaj novo obaveštenje </h2>


                <div className="forma" >
                    <div className="field">
                        <label className='tekst'>Naslov</label>
                        <br>
                        </br>
                        <input className='input'
                            type="text"
                            name="naslov"
                            placeholder="naslov"
                            value={formValues.naslov}
                            onChange={handleChange}
                        />
                    </div>
                    < p className="upozorenja">{formErrors.naslov}</p>
                    <div className="field">
                        <label className='tekst'>Opis</label>
                        <br>
                        </br>
                        <textarea class="input" type="text"
                            name="opis"
                            placeholder="opis"
                            value={formValues.opis}
                            onChange={handleChange}></textarea>
                       
                    </div>
                    < p className="upozorenja">{formErrors.opis}</p>

                    <button className="dugme">Dodaj</button>
                    <button className="dugme" onClick={() => navigate("/OglasnaTabla", { state: idZgrade })}>Nazad</button>


                    {Object.keys(formErrors).length === 0 && isSubmit ? (
                        <p className="upozorenja">Dodavanje obaveštenja je uspešno obavljeno!</p>
                    ) : ""}


                </div>
            </form>
        </div>


    )
}
