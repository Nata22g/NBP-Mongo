import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Table, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../PomocneKomponente/SearchBar';

import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


export default function PregledStanara() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(1);
    const idZgrade = (useLocation()).state.id;
    const lokacija = (useLocation()).state.lokacija;
    console.log("idZgrade iz liste stanara ", idZgrade);


    const axiosPrivate = useAxiosPrivate();

    const { user, dispatch } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
        console.log("id zgrade", idZgrade);
    }, [data])

    const getUsers = async () => {
        try {
            const response = await axiosPrivate.get(`http://localhost:8080/api/zgrada/prikaziSveStanareZgrade/${idZgrade}`);
            setData(response.data);
            setFilteredItems(response.data);
            //console.log(response?.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }


    }
    console.warn(data);
    function obrisiStanara(id) {
        try {
            const response = axiosPrivate.delete(`http://localhost:8080/api/stanar/obrisiStanara/${id}`);
            getUsers();
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        
    }

    function dodajStanara() {
        navigate("/DodajStanara", { state: { id: idZgrade, lokacija: lokacija } });
    }

    const [filteredItems, setFilteredItems] = useState([]);

    
    return (
        <div >
            <div className="border rounded-sm " >

                <div className="my-2">
                  

                    <div className='d-flex justify-content-between align-items-center mx-2'>
                        <h2 className="dodaj-item" >Lista stanara zgrade:  {lokacija}</h2>

                    </div>

                </div>


                {data ? (
                    <Table reponsive='xl' striped variant='link' size="sm">
                        <thead className="border-top">
                            <tr>

                                <th>Ime </th>
                                <th>Prezime</th>
                                <th>Broj stana </th>
                                <th>Broj ukućana</th>
                                <th>  </th>
                            </tr>
                        </thead>
                        <tbody >
                            {filteredItems.map((item, i) => (

                                <tr key={i} className=" border-left-0 border-right-0 border-secondary ">


                                    <td>{item.ime}</td>
                                    <td>{item.prezime}</td>
                                    <td>{item.brStana}</td>
                                    <td>{item.brojUkucana}</td>
                                    <td> <Button variant='dark' onClick={() => obrisiStanara(item.stanarId)}>Izbrisi</Button> </td>
                                   
                                </tr>

                            ))}
                            <tr  className=" border-left-0 border-right-0 border-secondary ">
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  <Button className="btn btn-outline-dark" variant="outlined" onClick={() => dodajStanara()}><b>Dodaj</b></Button>
                                </td>
                                
                            </tr>

                        </tbody>
                    </Table>
                ) : (
                    <p>Trenutno nema stanara u zgradi... <Button className="btn btn-outline-dark" variant="outlined" onClick={() => dodajStanara()}><b>Dodaj</b></Button></p>
                )}
            </div>
        </div>)
}
