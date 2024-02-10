import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DirektorLayout from "./DirektorLayout";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

export default function PregledKvarova() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);
  const axiosPrivate = useAxiosPrivate();

  const [saradnici, setSaradnike] = useState(null);
  const [saradnikId, setSaradnikId] = useState(null);
  const { user, dispatch } = useAuth();
  console.log("direktor ", user.direktorId);

  useEffect(() => {
    const controller = new AbortController();
    getUsers();
    //preuzmiSaradnike();
    console.log(saradnici);
  }, []);

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get(
        `http://localhost:8080/api/kvar/prikaziSveKvaroveDirektor/${user.direktorId}`,
        {}
      );
      setData(response.data);
      console.log("dobar");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const popraviKvar = async (id) => {
    try {
        const response = await axiosPrivate.put(`http://localhost:8080/api/kvar/popraviKvarDirektor/` + id);
        getUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  
  console.warn(data);

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
      <div className="container d-flex justify-content-start mt-3 mx-2">
        <button
          className={
            selectedFilter === "all"
              ? "m-2 button button-all active"
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

      <div className="container px-4 px-lg-1 mt-3">
        <div
          className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center responsive "
          id="kvarovi"
        >
          {data ? (
            filteredItems?.map((item, i) => (
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
                        <b>Lokacija:</b> {item.zgrada}
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
                        onClick={() => popraviKvar(item.kvarId)}
                      >
                        Popravljeno
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </section>
  );
}
