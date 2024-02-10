import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";

export default function KvaroviStanar() {
  const { user, dispatch } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]); //data niz kvarova
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get(
        `http://localhost:8080/api/kvar/prikaziSveKvaroveStanar/${user.stanarId}`);
      setData(response.data);
      console.log(response?.data);
    } catch (error) {
      console.error("Error fetching kvarovi:", error);
    }
  };

  //filter
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleFilterChange = (filterValue) => {
    setSelectedFilter(filterValue);
  };

  const filteredItems = selectedFilter === 'all' ? data : data.filter(item => item.status === selectedFilter);



  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "left" }}>
      <h3 className="dodaj-item pt-2">Lista kvarova:</h3>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-start">
        <button
        className={selectedFilter === 'all' ? 'm-2 button button-all active' : 'm-2 button button-all'}
        onClick={() => handleFilterChange('all')}
        >Svi</button>
          <button
          className={selectedFilter === 'Završen' ? 'm-2 button button-zav active' : 'm-2 button button-zav'}
        onClick={() => handleFilterChange('Završen')}
          >Završen</button>
          <button
          className={selectedFilter === 'Odbijen' ? 'm-2 button button-odb active' : 'm-2 button button-odb'}
          onClick={() => handleFilterChange('Odbijen')}
          >Odbijen</button>
          <button
          className={selectedFilter === 'Prosleđen direktoru' ? 'm-2 button button-dir active' : 'm-2 button button-dir'}
          onClick={() => handleFilterChange('Prosleđen direktoru')}
          >Prosleđen direktoru</button>
          
        </div>
        <button className="m-2 button button-dark">
        <Link
            to="/PrijaviKvar"
            style={{ textDecoration: "none", color: "white" }}
          >
            Prijavi kvar
          </Link>
        </button>
      </div>
      {data ? (
        <Table
          reponsive="xl"
          striped
          variant="link"
          size="sm"
          style={{ marginTop: "20px" }}
        >
          <thead className="border-top">
            <tr>
              <th>Naslov</th>
              <th>Opis</th>
              <th>Urgentnost</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, i) => (
              <tr
                key={i}
                className="border-left-0 border-right-0 border-secondary"
              >
                <td>{item.naslov}</td>
                <td>{item.opis}</td>
                <td>{item.urgentnost}</td>
                <td>{item.status}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
