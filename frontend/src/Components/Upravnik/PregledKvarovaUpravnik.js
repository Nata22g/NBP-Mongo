import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import UpravnikLayout from "./UpravnikLayout";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

export default function PregledKvarovaUpravnik() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);
  const axiosPrivate = useAxiosPrivate();

  const { user, dispatch } = useAuth();
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
  const pom = useLocation();
  const idZgrade = pom.state.id;
  const lokacijaZ = pom.state.lokacija;
  //console.log("ovo je idZgrade iz pregleda kvarova", idZgrade);
  //console.log("ovo je user", user);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get(
        `http://localhost:8080/api/kvar/prikaziSveKvaroveUpravnik/` +
        user.upravnikId +
        `/` +
        idZgrade
      );
      setData(response.data);
      //console.log(response?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  console.warn(data);

  async function proslediKvarDirektoru(id) {
    try {
      //console.log("kvar ", id);
      const response = await axiosPrivate.put(`http://localhost:8080/api/kvar/proslediKvarDirektoru/${id}`);
      getUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function odbijKvar(id) {
    try {
      //console.log("KVAR AJ DI " + id);
      const response = await axiosPrivate.put(
        `http://localhost:8080/api/kvar/odbijKvarUpravnik/` + id
      );

      getUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  //filter
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (filterValue) => {
    setSelectedFilter(filterValue);
  };

  const filteredItems =
    selectedFilter === "all"
      ? data
      : data.filter((item) => item.urgentnost === selectedFilter);

  return (
    <section className="py-10">

      <div className="container px-4 px-lg-1 mt-5" >
        <div className="mx-0 px-0" >
          <h3 className="dodaj-item">Lista kvarova zgrade: {lokacijaZ}</h3>
          <div className="container d-flex justify-content-between align-items-center mt-1 px-0 mx-0 ">
            <div className="d-flex justify-content-start align-content-centar">
              <button
                className={
                  selectedFilter === "all"
                    ? "ml-0 mr-2 my-2 button button-all active"
                    : "m-2 button button-all"
                }
                onClick={() => handleFilterChange("all")}
              >
                Svi
              </button>
              <button
                className={
                  selectedFilter === "Hitno je"
                    ? "m-2 button button-odb active"
                    : "m-2 button button-odb"
                }
                onClick={() => handleFilterChange("Hitno je")}
              >
                Hitno je
              </button>
              <button
                className={
                  selectedFilter === "Nije hitno"
                    ? "m-2 button button-zav active"
                    : "m-2 button button-zav"
                }
                onClick={() => handleFilterChange("Nije hitno")}
              >
                Nije hitno
              </button>
            </div>
            <button className="dugme"
              onClick={() =>
                navigate("/Zgrade", {
                  state: { id: idZgrade, lokacija: lokacijaZ },
                })
              }
            >
              Nazad
            </button>
          </div>


        </div>

        <div className="container px-4 px-lg-1 mt-3">
          <div
            className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center responsive "
            id="kvarovi"
          >
            {data ? (
              filteredItems.map((item, i) => (
                <div className="col mb-5 " key={i}>
                  <div className="card h-100 kvar-container">
                    <div className="card-body p-2 text-center kvar-item">
                      <div className="kvar-subitem">
                        <h2>{item.naslov}</h2>
                        <h4>
                          <b>Urgentnost:</b>
                          <br></br>
                        </h4>{" "}
                        <p>{item.urgentnost}</p>
                      </div>
                      <div className="kvar-subitem">
                        <p className="text-center">
                          <b>Opis:</b> {item.opis}
                        </p>
                        <p className="text-center">
                          <b>Lokacija:</b> {item.zgradaLokacija}
                        </p>
                        <p className="text-center">
                          <b>Stan:</b> {item.stan}
                        </p>
                      </div>
                    </div>

                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent kvar-item">
                      <div className="text-center">
                        <Button
                          variant="dark"
                          className="dugme"
                          onClick={() => proslediKvarDirektoru(item.kvarId)}
                        >
                          Prosledi direktoru
                        </Button>
                        <Button
                          variant="dark"
                          className="dugme"
                          onClick={() => odbijKvar(item.kvarId)}
                        >
                          Odbij kvar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Nema nijednog prijavljenog kvara...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
