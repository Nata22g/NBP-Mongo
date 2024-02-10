import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import DirektorLayout from './DirektorLayout';
import { Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import image from '../../Assets/zgrada.jpg';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import SearchBar from "../PomocneKomponente/SearchBar";


export default function PrikazSvihZgrada() {
  const axiosPrivate = useAxiosPrivate();
  const { user, dispatch } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    getUsers();

  }, [])

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get("http://localhost:8080/api/zgrada/prikaziSveZgrade",

      );
      setData(response.data);
      setFilteredItems(response.data);
      console.log(response?.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }

  }
  console.warn(data);

  console.warn(data);


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
    <section className="py-10">

      <div className="container px-4 px-lg-5 mt-5 " >
        <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center responsive " >
          {data ? (filteredItems.map((item, i) => (
            <div className="col mb-5 max-h-10" key={i}>
              <div className="card h-100">

                <img className="img-fluid img-thumbnail" id='slike-zgrada' src={image} alt="..." />

                <div className="card-body p-4 text-center">

                  <h6 >Lokacija:</h6>
                  <h4 > {item.lokacija}</h4>
                  <h6 >Broj stanova:</h6>
                  <h4 >{item.brStanova}</h4>


                </div>

              </div>
            </div>

          ))) : (<p>Loading...</p>)}
        </div>

      </div>
    </section>

  )
}
