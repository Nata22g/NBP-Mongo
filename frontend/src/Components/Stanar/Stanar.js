import React, { useState, useEffect, useContext } from 'react'
import { Button } from 'react-bootstrap';
import { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import useRefreshToken from '../../hooks/useRefreshToken';
import { Link } from 'react-router-dom';
import stanarSlika from '../../Assets/stanar.png'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

export default function Stanar() {

  const { user, dispatch } = useAuth();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  const [ime, setIme] = useState();
  const [prezime, setPrezime] = useState();
  const [email, setEmail] = useState();
  const [broj, setBroj] = useState();
  const [zgrada, setZgrada] = useState();
  const [brojStana, setBrojStana] = useState();
  const [brojUkucana, setBrojUkucana] = useState();

  useEffect(() => {
    const isMounted = true;
    const controller = new AbortController();

  }, [user])

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

        .left {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .right {
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

          .left {
            margin-bottom: 0;
          }

          .right {
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
        <div className="left">
          <img src={stanarSlika} alt="user" />
          <h6>Stanar</h6>
          <h4>{user.ime} {user.prezime}</h4>
          <Button className='btn btn-success'>
            <Link to="/IzmeniStanara" className='links' style={{ textDecoration: "none", color: "white" }}>Izmeni podatke</Link >
          </Button>
        </div>
        <div className="right">
          <div className="info">
            <h3>Informacije</h3>
            <div className="info_data">
              <div className="data">
                <h4>Korisničko ime</h4>
                <p>{user.username}</p>
              </div>
              <div className="data">
                <h4>Zgrada</h4>
                <p>{user.zgrada}</p>
              </div>
              <div className="data">
                <h4>Broj stana</h4>
                <p>{user.brStana}</p>
              </div>
              <div className="data">
                <h4>Broj ukucana</h4>
                <p>{user.brojUkucana}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
