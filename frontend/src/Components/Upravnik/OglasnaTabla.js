// import React, { useState, useEffect } from 'react'
// import "bootstrap/dist/css/bootstrap.min.css"
// import { Table, Button } from 'react-bootstrap';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import UpravnikLayout from './UpravnikLayout'
// import useAuth from '../../hooks/useAuth';
// import useAxiosPrivate from '../../hooks/useAxiosPrivate';

// export default function OglasnaTabla() {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [count, setCount] = useState(1);

//     const pom = useLocation();
//     const idZgrade = pom.state;
//     console.log("id zgrade iz oglasna tabla", idZgrade)
//     const [saradnici, setSaradnike] = useState(null);
//     const [saradnikId, setSaradnikId] = useState(null);

//     const navigate = useNavigate();
//     const axiosPrivate = useAxiosPrivate();


//     const { user, dispatch } = useAuth();


//     useEffect(() => {
//         getUsers();
//         console.log(idZgrade.state)
//         console.log(data)
//     }, [])

//     const getUsers = async () => {
//         try {
//             const response = await axiosPrivate.get(`http://localhost:8080/api/obavestenje/prikaziSvaObavestenjaUpravnik/${idZgrade}`,

//             ); setData(response.data);
//             console.log(response?.data);

//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }


//     }

//     console.warn(data);
//     //function obrisiKvar(id) {
//     //
//     //  fetch(`http://localhost:8000/kvarovi/${id}`,
//     //    { method: 'DELETE' }
//     //  ).then((result) => {
//     //    result.json().then((resp) => {
//     //      console.warn(resp)
//     //    })
//     //  })
//     //  getUsers();
//     //}

//     const obrisi = async (id) => {
//         console.log(id)

//         await axiosPrivate.delete('http://localhost:8080/api/obavestenje/obrisiObavestenjeUpravnik/' + id + '/' + user.upravnikId)
//             .then(p => {
//                 if (p.status === 200) {
//                     alert('Uspesno ste obrisali obavestenje!')
//                     getUsers();
//                 }
//             }).catch((error) => {
//                 alert('Doslo je do greske prilikom brisanja')
//             });

//     }


//     function dodajObavestenje() {
//         navigate("/DodajObavestenje", { state: idZgrade });

//     }

//     //sortiranje
//     const sortMostRecent = () => {
//         const sortedItems = [...data].sort((a, b) => new Date(b.datum) - new Date(a.datum));
//         setData(sortedItems);
//     };

//     const sortLeastRecent = () => {
//         const sortedItems = [...data].sort((a, b) => new Date(a.datum) - new Date(b.datum));
//         setData(sortedItems);
//     };


//     return (
//         <section className="py-10">


//             <div className="container px-4 px-lg-1 mt-5" >
//                 <div className style={{ paddingBottom: '15px', paddingLeft: '0px' }}>
//                     <h3 className="dodaj-item" >Obaveštenja:  </h3>
//                     <div className=" d-flex justify-content-between align-items-center">
//                         <div className=" d-flex align-items-center ">
//                             <button className="button button-all" onClick={sortMostRecent}>Najnoviji</button>
//                             <button className="button button-all" onClick={sortLeastRecent}>Najstariji</button>
//                         </div>
//                         <div>
//                             <Button variant='dark' className='dugme btn-block' onClick={() => dodajObavestenje()}>Dodaj</Button>
//                         </div>
//                     </div>

//                 </div>
//                 <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center responsive " id='kvarovi' >
//                     {data ? (data.map((item, i) => (
//                         <div className="col mb-5 " key={i}>
//                             <div className="card h-100 kvar-container ">

//                                 <div className="card-body p-2 text kvar-item">
//                                     <div className='kvar-subitem'>
//                                         <h4></h4> <p>{item.datum}</p></div>
//                                     <h4 className='text-center'>{item.naslov}</h4>

//                                     <div className='kvar-subitem'>
//                                         <p className='text-center'>{item.ime} {item.prezime}</p>
//                                         <p className='text-center'><b>Detalji:</b> {item.opis}</p>
//                                     </div>

//                                 </div>

//                                 <div className="card-footer p-4 pt-0 border-top-0 bg-transparent kvar-item" >
//                                     <div className="text-center"><Button variant='dark' onClick={() => obrisi(item.obavestenjeId)}>Obriši</Button></div>
//                                 </div>
//                             </div>
//                         </div>

//                     ))) : (<p>Loading...</p>)}
//                 </div>

//             </div>
//         </section>
//     )
// }

import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UpravnikLayout from './UpravnikLayout';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function OglasnaTabla() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);

  const pom = useLocation();
  const idZgrade = pom.state;
  console.log("id zgrade iz oglasna tabla", idZgrade);
  const [saradnici, setSaradnike] = useState(null);
  const [saradnikId, setSaradnikId] = useState(null);

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { user, dispatch } = useAuth();

  useEffect(() => {
    getUsers();
    console.log("idZgrade", idZgrade);
    console.log("data", data);
  }, []);

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get(`http://localhost:8080/api/obavestenje/prikaziSvaObavestenjaUpravnik/${idZgrade}`);

      setData(response.data);
      console.log("data", response.data);
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
   
  };

  const obrisi = async (id) => {
    console.log(id);

    await axiosPrivate
      .delete(`http://localhost:8080/api/obavestenje/obrisiObavestenjeUpravnik/${id}/${user.upravnikId}`)
      .then((p) => {
        if (p.status === 200) {
          //alert('Uspesno ste obrisali obavestenje!');
          getUsers();
        }
      })
      .catch((error) => {
        alert('Doslo je do greske prilikom brisanja');
      });
  };

  function dodajObavestenje() {
    navigate("/DodajObavestenje", { state: idZgrade });
  }

  return (
    <section className="py-10">
      <div className="container px-4 px-lg-1 mt-5">
        <div style={{ paddingBottom: '15px', paddingLeft: '0px' }}>
          <h3 className="dodaj-item">Obaveštenja:</h3>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
            </div>
            <div>
              <Button variant="dark" className="btn-block" onClick={dodajObavestenje}>Dodaj</Button>
            </div>
          </div>
        </div>
        <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center responsive" id="kvarovi">
          {data ? (
            data.map((item, i) => (
              <div className="col mb-5" key={i}>
                <div className="card h-100 kvar-container">
                  <div className="card-body p-2 text kvar-item">
                    <div className="kvar-subitem">
                      <h4></h4> <p>{item.datum}</p>
                    </div>
                    <h4 className="text-center">{item.naslov}</h4>
                    <div className="kvar-subitem">
                      <p className="text-center">autor: {item.ime} {item.prezime}</p>
                      <p className="text-center"><b>Detalji:</b> {item.opis}</p>
                    </div>
                  </div>
                  {(item.autorId === user.upravnikId) ? (
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
    </section>
  );
}





