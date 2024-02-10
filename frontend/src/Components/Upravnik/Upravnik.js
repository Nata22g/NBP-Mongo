import React, {useState, useEffect, useContext} from 'react'
import { Button} from 'react-bootstrap';
import { axiosPrivate } from '../../api/axios';
import useRefreshToken from '../../hooks/useRefreshToken';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import upravnikSlika from '../../Assets/upravnik.png'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


export default function Upravnik() {

  const {user,dispatch}=useAuth();
  const axiosPrivate=useAxiosPrivate();
  const [data, setData]=useState([]);
    const[loading, setLoading]=useState(true);
    const[error, setError]=useState(null);

    useEffect(() => {
      console.log(user);
   },[user])

    //mozda mi treba za kvarove, ne znam za stanara
    useEffect(() => {
      const isMounted=true;
      const controller=new AbortController();

      //getUser();
  
    },[])


      async function izmeniUpravnika(){
        
      }
    
  return (
    <>
    <style>
      {`
        .wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-start;
        }

        .left-p {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .right-p {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .info_data {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          margin-top: 10px;
        }

        .data {
          display: flex;
          flex-direction: column;
        }

        h4 {
          margin-bottom: 5px;
        }

        @media (max-width: 600px) {
          .wrapper {
            flex-direction: column;
            align-items: stretch;
          }

          .left-p {
            margin-bottom: 0;
          }

          .right-p {
            align-items: stretch;
          }

          .info_data {
            grid-template-columns: 1fr;
            gap: 10px;
            margin-top: 20px;
          }
        }
      `}
    </style>

    <div className="wrapper">
      <div className="left-p" style={{backgroundColor: '#a79dc8'}}>
        <img src={upravnikSlika} alt="user"  />
        <h6>Upravnik</h6>
        <h4>{user.ime} {user.prezime}</h4>
        <button className=' btn-upravnik'>
            <Link to="/IzmeniUpravnika" className='links' style={{textDecoration:"none", color:"white"}}>Izmeni podatke</Link >
          </button>
      </div>
      <div className="right-p">
        <div className="info">
          <h3>Informacije</h3>
          <div className="info_data">
          <div className="data">
              <h4>Ime</h4>
              <p>{user.ime}</p>
            </div>
            <div className="data">
              <h4>Prezime</h4>
              <p>{user.prezime}</p>
            </div>
            <div className="data">
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>
            <div className="data">
              <h4>Broj telefona</h4>
              <p>{user.telefon}</p>
            </div>
           
            
          </div>
        </div>
       
      </div>
    </div>
    </>
  );
}
