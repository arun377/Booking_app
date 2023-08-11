import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
// import {useLocation,userNavigation} from 'react-router-dom';

function Indexpage(){
    const [places,setPlaces]=useState([]);
    useEffect(()=>{
        axios.get('/places').then(response=>{
            setPlaces(response.data);
        });
    },[]);
    // const location=useLocation();
    return(
        <div className='mt-8 gap-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {places.length > 0 && places.map(place=>(
            <Link to={'/place/'+place._id}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] &&(
                <img className="rounded-2xl object-cover aspect-square"src={'http://localhost:3000/uploads/'+place.photos?.[0]} alt=""/>
                )}
                </div>
                <h3 className="font-bold ">{place.address}</h3>
                <div className="sm truncate text-gray-600">{place.title}</div>
               
                <div className="mt-1 ">
                <span className="font-bold">₹{place.price} </span>per day
                </div>
            </Link>
        ))}
         </div>
    )   
}
export default Indexpage;