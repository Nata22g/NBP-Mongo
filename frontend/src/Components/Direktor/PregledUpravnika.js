import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import DodajUpravnika from './DodajUpravnika';
import PrikazZgradaPoUpravniku from './PrikazZgradaPoUpravniku'
import SearchBar from '../PomocneKomponente/SearchBar';

import axios from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function PregledUpravnika() {

  const { user, dispatch } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {

    getUsers();
    console.log(data)

  }, [])

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get("http://localhost:8080/api/upravnik/vidiSveUpravnike",
        //const response = await axiosPrivate.get("http://localhost:8000/upravnik",

      );
      setData(response.data);
      setFilteredItems(response.data);
      console.log(response?.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  console.warn(data);
  const obrisiUpravnika = async (id) => {
    console.log(id)

    await axiosPrivate.delete('http://localhost:8080/api/upravnik/obrisiUpravnika/' + id)
      .then(p => {
        if (p.status === 200) {
       
          getUsers();
        }
      }).catch((error) => {
        alert('Doslo je do greske prilikom brisanja')
      });

    // getUsers();
  }

  function prikaziZgrade(id) {
    //<PrikazZgradaPoUpravniku idUpravnika={id}/>
    navigate("/PrikazZgradaPoUpravniku", { state: id });
    //console.log(id);
  }

  const [filteredItems, setFilteredItems] = useState([]);

  return (
    <div>
      <div className="okvir" >
        <div className>

          <div className='d-flex justify-content-between align-items-center m-2'>
            <h3 className="dodaj-item" >Lista upravnika:  </h3>
          </div>
        </div>

        {data ? (
          <Table reponsive='xl' striped variant='link' size="sm"  >
            <thead className="border-top"  >
              <tr>

                <th>Ime</th>
                <th>Prezime</th>
                <th>Telefon</th>
                <th>E-mail</th>
                <th>Broj zgrada</th>
                <th>Detalji o zgradama</th>
                <th>  </th>

              </tr>
            </thead>
            <tbody >
              {filteredItems.map((item, i) => (
                <tr key={i} className=" border-left-0 border-right-0 border-secondary ">

                  <td>{item.ime}</td>
                  <td>{item.prezime}</td>
                  <td>{item.telefon}</td>
                  <td>{item.email}</td>
                  <td>{item.brojZgrada}</td>
                  <td><Button variant='dark' onClick={() => prikaziZgrade(item.upravnikId)}> Zgrade
                  </Button></td>
                  <td> <Button variant='dark' onClick={() => obrisiUpravnika(item.upravnikId)}>Izbrisi</Button> </td>


                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><Button className="btn btn-outline-dark" variant="outlined" onClick={() => navigate("/DodajUpravnika")}><b>Dodaj</b></Button></td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <p>Loading...</p>
        )}



      </div>
    </div>)
}
