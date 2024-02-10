import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Table, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ObavestenjaStanar() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);
  const colors = ["blue", "green", "yellow", "brown", "pink", "purple", "orange"]
  const [saradnici, setSaradnike] = useState(null);
  const [saradnikId, setSaradnikId] = useState(null);

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { user, dispatch } = useAuth();
  console.log("user", user);
  const [color, setColor] = useState();


  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get(`http://localhost:8080/api/obavestenje/prikaziSvaObavestenjaStanar/${user.stanarId}`);
      setData(response.data);
      console.log(response?.data);

    } catch (error) {
      console.error('Error fetching users:', error);
    }


  }

  console.warn(data);


  const obrisi = async (id) => {
    console.log(id)

    await axiosPrivate.delete('http://localhost:8080/api/obavestenje/obrisiObavestenjeStanar/' + id + '/' + user.stanarId)
      .then(p => {
        if (p.status === 200) {
         
          getUsers();
        }
      }).catch((error) => {
        alert('Doslo je do greske prilikom brisanja')
      });

  }


  function dodajObavestenje() {
    navigate("/DodajObavestenjeStanar");

  }

  return (
    <div className="container mt-5 " >
      <div className style={{ paddingBottom: '15px', paddingLeft: '0px' }}>
        <h3 className="dodaj-item" >Obaveštenja:  </h3>
        <div className=" d-flex justify-content-between align-items-center">
          <div>
            <Button variant='dark' className='dugme btn-block' onClick={() => dodajObavestenje()}>Dodaj</Button>
          </div>
        </div>

      </div>
      <div className="row">
  {data ? (
    data.map((item, i) => (
      <div className="d-flex flex-row col-md-3 col-sm-6 mt-3 content-card" key={i}>
        <div className="card flex-fill card-just-text rounded-0 shadow h-100" data-background="color" data-color={colors[(i)%(7)]} data-radius="none">
          <div className="card-body">
            <h6 className="category">{item.datum}</h6>
            <h4 className="title">{item.naslov}</h4>
            <p className="description">{item.opis}</p>
            <p className="description">{item.ime} {item.prezime}</p>
          </div> 
          {(item.autorId === user.stanarId) ? (
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent kvar-item">
                       <div className="text-end">
                      <Button variant="link" onClick={() => obrisi(item.obavestenjeId)} >
                      <FontAwesomeIcon icon={faTrash} style={{ color: 'black' }}/>
                      </Button>
                    </div>
                    </div>
                  ):""}
        </div>
       
      </div>
    ))
  ) : (
    <p>Loading...</p>
  )}
</div>


    </div>

  )
}
