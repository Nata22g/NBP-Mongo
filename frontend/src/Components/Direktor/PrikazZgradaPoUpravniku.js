import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import DirektorLayout from './DirektorLayout';
import { Image, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import image from '../../Assets/zgrada.jpg';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';


export default function PrikazZgradaPoUpravniku() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const idUpravnika = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const { user, dispatch } = useAuth();


    useEffect(() => {
        const controller = new AbortController();
        getUsers();
        console.log(idUpravnika)
    }, [])



    const getUsers = async () => {//zgrade po upravniku
        try {
            const response = await axiosPrivate.get(`http://localhost:8080/api/zgrada/prikaziZgradeUpravnika/${idUpravnika.state}`,
                //{
                //  signal:controller.signal
                //}
            );
            setData(response.data);
            console.log(response?.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }

    }
    console.warn(data);

    console.warn(data);
    
    return (
        <section className="py-10">


            <div className="container px-4 px-lg-5 mt-5 " >

                <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-3 justify-content-center responsive " >

                    {data ? (data.map((item, i) => (
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
