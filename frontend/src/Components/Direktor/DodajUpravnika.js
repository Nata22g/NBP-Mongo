import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from 'react-bootstrap';
import slika from '../../Assets/saradnik2.jpg'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
export default function DodajUpravnika() {

    const podaci = { username: "", password: "", tipKorisnika: "Upravnik", ime: "", prezime: "", lokacija: "", telefon: null, email: "" };
    //const zgradaDrop = { brStanova: "", lokacija: "", stanari: "", upravnikId: null, kvarovi: {} , zgrada:""};

    const [formValues, setFormValues] = useState(podaci);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    //const [zgradeDrop, setZgradeDrop]=useState(zgradaDrop);
    const [listaZgrade, setZgrade] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    const { user, dispatch } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log({ name, value });
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);


    };
    //DORADI!!!!!!!!!!!
    const handleSelect = (e) => {

        const zgradaId = e.target.value;
        console.log(e.target.value);

        const { name, value } = e.target;
        console.log({ name, value });
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);

    };
    useEffect(() => {

        preuzmiZgrade();
        //console.log(listaZgrade)
    }, [])

    useEffect(() => {
        //console.log("iz useEffect: ");
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            saveData();
            preuzmiZgrade();
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
            errors.username = "Obavezno polje!";
        }
        if (!values.lokacija) {
            errors.lokacija = "Obavezno polje!";
        }
        if (!values.telefon) {
            errors.telefon = "Obavezno polje";
        } else if (!regex2.test(values.telefon)) {
            errors.telefon = "Format nije odgovarajući!";
        }
        if (!values.email) {
            errors.email = "Obavezno polje";
        } else if (!regex.test(values.email)) {
            errors.email = "Format nije odgovarajući!";
        }
        if (!values.password) {
            errors.password = "Dodaj šifru";
        } else if (values.password.length < 4) {
            errors.password = "Šifra mora biti duža od 4 karaktera!";
        } else if (values.password.length > 10) {
            errors.password = "Šifra ne sme imati više od 10 karaktera!";
        }

        return errors;
    };






    const preuzmiZgrade = async () => {
        try {
            const response = await axiosPrivate.get(`http://localhost:8080/api/zgrada/prikaziZgradeBezUpravnika/${user.direktorId}`,
                //{
                //  signal:controller.signal
                //}
            );
            setZgrade(response.data);
            console.log(response?.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }

    }

    const saveData = async () => {
        try {
            console.log(formValues);
            const response = await axiosPrivate.post(`http://localhost:8080/api/upravnik/dodajUpravnika/${user.direktorId}`, formValues
               
            );

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
                <h2>Dodaj novog upravnika</h2>

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
                            type="text"
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
                        <label className='tekst'>Izbor zgrade </label>
                        <br></br>
                        <select

                            className="custom-select" defaultValue="default"
                            name="lokacija" onChange={handleChange}>
                            <option className='text-center mb-3' >Izaberi</option>
                            {listaZgrade ? (listaZgrade.map((item, i) => {
                                return (<option key={i} value={item.lokacija} >{item.lokacija} </option>);

                            })) : (<option className='text-center mb-3'>Nema slobodnih zgrada</option>)}


                        </select>
                        < p className="upozorenja">{formErrors.lokacija}</p>
                    </div>
                    <div className="field">
                        <label className='tekst'>E-mail</label>
                        <br>
                        </br>
                        <input className='input'
                            type="email"
                            name="email"
                            placeholder="e-mail"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </div>
                    < p className="upozorenja">{formErrors.email}</p>

                    <div className="field">
                        <label className='tekst'>Telefon</label>
                        <br></br>
                        <input className='input'
                            type="tel"
                            name="telefon"
                            placeholder="telefon"
                            value={formValues.telefon}
                            onChange={handleChange}
                        />
                    </div>

                    <p className="upozorenja">{formErrors.telefon}</p>



                    <button className="dugme" type='submit'>Dodaj</button>
                    <button className="dugme" onClick={() => navigate("/Upravnici")}>Nazad</button>


                    {Object.keys(formErrors).length === 0 && isSubmit ? (
                        <p className="upozorenja">Dodavanje upravnika je uspešno obavljeno!</p>
                    ) : ""}
                </div>
            </form>
        </div>



    )
}
