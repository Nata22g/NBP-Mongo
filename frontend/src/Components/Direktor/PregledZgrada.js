import { useState, useEffect } from "react";
import DirektorLayout from "./DirektorLayout";
import slika from '../../Assets/pozadina-dodaj1.png';
import { useNavigate } from 'react-router-dom';
import PrikazSvihZgrada from "./PrikazSvihZgrada";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

export default function PregledZgrada() {
    const podaci = { brStanova: "", lokacija: "", stanari: "", kvarovi: {} };
    const [formValues, setFormValues] = useState(podaci);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    
    const axiosPrivate=useAxiosPrivate();
    const navigate = useNavigate();
    const {auth,setAuth}=useAuth();

    const { user, dispatch } = useAuth();

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
        console.log("iz useEffect: ");
        console.log(formErrors);
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
        if (!values.lokacija) {
            errors.lokacija = "Obavezno polje!";
        }
        if (!values.brStanova) {
            errors.brStanova = "Obavezno polje!";
        }
        else if (values.brStanova < 1) {
            errors.brStanova = "Mora biti pozitivan broj!";
        }


        return errors;
    };

    const saveData=async()=> {
        try {
            console.log("fromValues", formValues)
            const response = await axiosPrivate.post(`http://localhost:8080/api/zgrada/dodajZgradu/`+user.direktorId,formValues);
        }
           
          catch (error) {
            console.error('Error fetching users:', error);
          }

    }
    return (
            <div className="" style={{
                backgroundImage: `url(${slika})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                
            }}>

                <div className="Dodaj" >
                    <form className="" onSubmit={handleSubmit} >
                        <h2>Dodaj novu zgradu</h2>

                        <div className="forma" >
                            <div className="field">
                                <label className='tekst'>Lokacija</label>
                                <br>
                                </br>
                                <input className='input'
                                    type="text"
                                    name="lokacija"
                                    placeholder="lokacija"
                                    value={formValues.lokacija}
                                    onChange={handleChange}
                                />
                            </div>
                            < p className="upozorenja">{formErrors.lokacija}</p>
                            <div className="field">
                                <label className='tekst'>Broj stanova</label>
                                <br></br>
                                <input className='input'
                                    type="number"
                                    name="brStanova"
                                    placeholder="broj stanova u zgradi"
                                    value={formValues.brStanova}
                                    onChange={handleChange}
                                />
                            </div>
                            <p className="upozorenja">{formErrors.brStanova}</p>

                            <button className="dugme"  onClick={() =>navigate("/PrikazSvihZgrada")}>Lista Zgrada</button>
                            <button className="dugme">Dodaj</button>
                           
                            {Object.keys(formErrors).length === 0 && isSubmit ? (
                                <p className="upozorenja">Dodavanje zgrade je uspešno obavljeno!</p>
                            ) : ""}

                            
                        </div>
                    </form>
                </div>

            </div>
    );
}

