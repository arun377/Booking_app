import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage(){
    const {id}=useParams();
    const [booking,setBooking]=useState(null);
    useEffect(()=>{
        if(id){
         axios.get('/booking').then(response=>{
        const foundBooking= response.data.find(({_id})=>_id==id);
        if(foundBooking){
            setBooking(foundBooking);
        }
         });
        }

    },[id]);

    if(!booking){
        return '';
    }
    return(
        <div className="mt-8">
          <h1 className="text-xl">  {booking.place.title}</h1>
          <a className="black my-3 flex gap-1 font-semibold underline" href={'https://maps.google.com/?q='+booking.place.address}>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
 </svg> {booking.place.address}</a>
 <div className="bg-gray-200 flex items-center justify-between  p-4 mb-4 rounded-xl">
    <h2 className="text-2xl ">Your booking information:</h2>
<div>
    Dates<BookingDates booking={booking}/>
    </div>
    <div className="bg-prim1 text-white shadow  shadow-md p-4 rounded-xl  ml-3">
    Total price: <span className="text-xl">₹{booking.price}</span>
    </div>
 </div>
         <PlaceGallery place={booking.place}/>
        </div>

    );
}