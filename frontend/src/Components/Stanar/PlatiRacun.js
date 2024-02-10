import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import slika from '../../Assets/naplata3.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function Platiuplata() {

    const axiosPrivate = useAxiosPrivate();

    const { user, dispatch } = useAuth();



    const ime = user.ime;
    const prezime = user.prezime;
    const podaci = { naslov: "", opis: "", uplata: "" };
    const [formValues, setFormValues] = useState(podaci);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const [dugovanje, setDugovanje] = useState(user.dugovanje);
    console.log("dugovanjee!!", user.dugovanje);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            saveData();
            console.log("uspešno");
            console.log("novo dugovanje", user.dugovanje)
        } else {
            console.log("nije uspešno ", formErrors);

        }
    };



    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regex2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gmi;

        if (!values.uplata) {
            errors.uplata = "Obavezno polje!";
        }
        if (!values.opis) {
            errors.opis = "Obavezno polje!";
        }

        if (!values.naslov) {
            errors.naslov = "Obavezno polje";

        }


        return errors;
    };

    const saveData = async () => {
        try {
            console.log("ovooo", formValues.uplata);
            const response = axiosPrivate.put(`http://localhost:8080/api/stanar/uplatiDugovanje/${user.stanarId}`, formValues);
            dispatch({ tip: "UPDATE_USER", payload: { ...user, ...formValues } })
            //user.dugovanje=user.dugovanje-formValues.uplata;
        } catch (error) {
            console.error('Error fetching users:', error);
        }


    }




    return (



        <div className="Dodaj" style={{
            backgroundImage: `url(${slika})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundPosition: "center"


        }}>
            <form className="" onSubmit={handleSubmit} >
                <h2>Uplati novac za zajedničke troškove:  </h2>


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
                        <label className='tekst'>Svrha naplate</label>
                        <br>
                        </br>
                        <textarea class="input" type="text"
                            name="opis"
                            placeholder="opis"
                            value={formValues.opis}
                            onChange={handleChange}></textarea>

                    </div>
                    < p className="upozorenja">{formErrors.opis}</p>

                    <div className="field">
                        <label className='tekst'>Vrednost uplate</label>
                        <br>
                        </br>
                        <input className='input' type="number"
                            name="uplata"
                            placeholder="uplata"
                            value={formValues.uplata}
                            onChange={handleChange} />

                    </div>
                    < p className="upozorenja">{formErrors.uplata}</p>
                    <button className="dugme" >Uplati</button>
                    <button className="dugme" onClick={() => navigate("/Stanar")}>Nazad</button>


                    {Object.keys(formErrors).length === 0 && isSubmit ? (
                        <p className="upozorenja">Uplata je uspešno obavljena!</p>
                    ) : ""}


                </div>
            </form>
        </div>


    )
}
