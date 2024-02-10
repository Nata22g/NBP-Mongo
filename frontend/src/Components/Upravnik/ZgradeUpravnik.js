import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UpravnikLayout from "./UpravnikLayout";
import { Image, ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "../../Assets/zgrada.jpg";
import OglasnaTabla from "./OglasnaTabla";
import PregledStanara from "./PregledStanara";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SearchBar from "../PomocneKomponente/SearchBar";

import { VariantProp } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';

export default function ZgradeUpravnik() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const idUpravnika = useLocation();
  const axiosPrivate = useAxiosPrivate();
const racun=400;
  const { user, dispatch } = useAuth();

  const navigate = useNavigate();

  //const {auth,setAuth}=useAuth();

  useEffect(() => {
    getUsers();
    console.log("user ", user);
    console.log("data", data);
  }, []);

  const getUsers = async () => {
    //zgrade po upravniku
    try {
      const response = await axiosPrivate.get(
        `http://localhost:8080/api/zgrada/prikaziZgradeUpravnikaU/${user.upravnikId}`
      );
      setData(response.data);
      setFilteredItems(response.data);
      console.log(response?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //console.warn(data);
  //function obrisiZgradu(id) {
  //
  //    fetch(`http://localhost:8000/zgrade/${idUpravnika.state}`,
  //        { method: 'DELETE' }
  //    ).then((result) => {
  //        result.json().then((resp) => {
  //            console.warn(resp)
  //        })
  //    })
  //    getUsers();
  //}
  //

  //function detalji(id, lokacija) {
  //    navigate("/PregledStanara",  { state: { id: id, lokacija: lokacija } });
  //}

  function oglasnaTabla(id) {
    console.log("id zgrada iz zgrade", id);
    navigate("/OglasnaTabla", { state: id });
  }

  function detalji(id, lokacija) {
    navigate("/PregledStanara", { state: { id: id, lokacija: lokacija } });
  }

  function vidiKvarove(id, lokacija) {
    navigate("/PregledKvarovaUpravnik", { state: { id: id, lokacija: lokacija } });
  }



  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = (searchQuery) => {
    console.log("searchQuery", searchQuery);

    if (typeof searchQuery !== "string") {
      setFilteredItems(data);
    }
    if (searchQuery === "") {
      setFilteredItems(data);
    }
    if (!searchQuery) {
      setFilteredItems(data);
    } else {
      const filtered = data.filter((item) =>
        item.lokacija.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  return (
    <section className="okvir">



      <div className="container px-4 px-lg-5 mt-5 " >

        <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center responsive " >

          {data ? (filteredItems.map((item, i) => (
            <div className="col mb-5 max-h-10" key={i}>
              <div className="card h-100">

                <img className="img-fluid img-thumbnail" id='slike-zgrada' src={image} alt="..." />

                <div className="card-body p-2 text-center">

                  <h6 >Lokacija:</h6>
                  <h4 > {item.lokacija}</h4>
                  <h6 >Broj stanova:</h6>
                  <h4 >{item.brStanova}</h4>


                </div>


                <div className="card-footer p-1 pt-1 border-top-0 bg-transparent text-center">
                  <ButtonGroup className='btn-group' variant='outlined' size="sm" aria-label="neutral button group" orientation="vertical">
                    <Button className="" variant='' onClick={() => detalji(item.zgradaId, item.lokacija)}>Stanari</Button>
                    <Button className="" variant='' onClick={() => vidiKvarove(item.zgradaId, item.lokacija)}>Kvarovi</Button>
                    <Button className="" variant='' onClick={() => oglasnaTabla(item.zgradaId)}>Oglasna tabla</Button>
                    
                  </ButtonGroup>
                </div>


              </div>
            </div>

          ))) : (<p>Loading...</p>)}
        </div>
      </div>
    </section>
  );
}
