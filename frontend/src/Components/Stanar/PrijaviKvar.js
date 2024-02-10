import React from "react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import slika from "../../Assets/kvar.jpg";
export default function PrijaviKvar() {
  const podaci = { naslov: "", opis: "", urgentnost: "" };

  const [formValues, setFormValues] = useState(podaci);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setFormValues({ ...formValues, [name]: value });
    //console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    console.log('MUNEEEEEEEEEEEM')
    console.log(formValues)
    console.log('MUNEM 2')
    console.log(Object.keys(formErrors).length)
    setIsSubmit(true);
    // if (Object.keys(formErrors).length === 0 && isSubmit) {
    //     saveData();
    //     console.log("uspešno");
    //   } else {
    //     console.log("nije uspešno");
    //   }
    saveData()
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regex2 =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim;
    if (!values.naslov) {
      errors.naslov = "Obavezno polje!";
    }
    if (!values.opis) {
      errors.opis = "Obavezno polje!";
    }
    return errors;
  };

  const saveData = async () => {
    try {
        const response = await axiosPrivate.post(`http://localhost:8080/api/kvar/prijaviKvar/`+user.stanarId, formValues);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

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
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          margin: "10%",
          padding: "5%",
          borderRadius: "5px",
          background: "rgb(255, 255, 250)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form className="forma" onSubmit={handleSubmit}>
          <h2>Prijavi kvar:</h2>
          <div style={{ alignItems: "center", justifyContent: "center" }}>
            <div className="field">
            <p className="tekst">Naslov</p>
            <input
              className="input"
              type="text"
              name="naslov"
              value={formValues.naslov}
              onChange={handleChange}
            ></input>
            </div>
            <p className="upozorenja">{formErrors.naslov}</p>
            
            <div className="field">
            <p className="tekst">Opis</p>
            <input
              className="input"
              type="text"
              name="opis"
              value={formValues.opis}
              onChange={handleChange}
            ></input>
            </div>
            <p className="upozorenja">{formErrors.opis}</p>
            <div className="field">
            <p className="tekst">Urgentnost</p>
            <select
              className="custom-select"
              defaultValue="default"
              name="urgentnost"
              onChange={handleChange}
            >
              <option className="text-center mb-3" >Izaberi</option>
              <option value='Hitno je'>Hitno je</option>
              <option value='Nije hitno'>Nije hitno </option>
            </select>
            </div>
            <button className="dugme mt-3 btn-success" type="submit">
              Prijavi
            </button>
            <button className="dugme" onClick={() => navigate("/KvaroviStanar")}>
              Nazad
            </button>

            {Object.keys(formErrors).length === 0 && isSubmit ? (
                        <p className="upozorenja">Prijavili ste kvar!</p>
                    ) : ""}
          </div>
        </form>
      </div>
    </div>
  );
}
