import { useState,useContext,useEffect } from "react";
import {differenceInCalendarDays } from 'date-fns';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";


export default function Bookingwidget({place}){
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [numberofGuest,setNumberofGuest]=useState(1);
    const [name,setName]=useState('');
    const [mobile,setMobile]=useState('');
    const [redirect,setRedirect]=useState('');
    const {user}=useContext(UserContext);

    useEffect(()=>{
      if(user){
        setName(user.name);
      }
    },[user]);

    let numberOfDays=0;
    if(checkIn && checkOut){
        numberOfDays=differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }
    async function BookThisPlace(){
      
      const response=await axios.post('/booking',{
        checkIn,checkOut,numberOfDays,name,mobile,
          place:place._id,
          price:numberOfDays * place.price,     
        
      });
      const bookingId=response.data._id;
      setRedirect('/account/booking/'+bookingId);
    }
    if(redirect){
      return<Navigate to={redirect}/>
    }

return(
    <div>
    <div className="bg-white shadow  p-4 rounded-2xl">
      <div className="text-2xl text-center">
      price:₹{place.price} / per day
      </div>

      <div className="border rounded-2xl p-2 mt-4">
        <div className="flex">
      <div className="py-3 px-4">
       <label>Check in:</label>
        <input type="date" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)}/>
      </div>
      <div className="py-3  px-4 border-l">
       <label>Check out:</label>
        <input type="date" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}/>
      </div>
      </div>
      <div className="py-3  px-4 border-t">
       <label>Number of guest:</label>
        <input type="number" placeholder="100" value={numberofGuest} onChange={ev=>setNumberofGuest(ev.target.value)}/>
      </div>
      {numberOfDays>0&&(
        <div className="py-3  px-4 border-t">
        <label>Your full name</label>
         <input type="text" placeholder="Chris Nolan" value={name} onChange={ev=>setName(ev.target.value)}/>
         <label>Phone number</label>
         <input type="tel" placeholder="6478******" value={mobile} onChange={ev=>setMobile(ev.target.value)}/>
      
       </div>
      )}
      </div>

      <button onClick={BookThisPlace} className="bg-prim1 py-2  w-full  mt-4 rounded-xl gap-1  text-white ">Book this place
      {numberOfDays &&( 
        <span>
           {numberOfDays * place.price} 
            </span>
      )}
      </button>
    </div>
    </div>
  
);
}