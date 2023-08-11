import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Bookingwidget from "../bookingwidget";
import PlaceGallery from "../PlaceGallery";

export default function PlacePage(){
  const {id}=useParams();
  const [place,setPlace]=useState(null);
  
  useEffect(()=>{
    if(!id){
        return;
    }
    axios.get('/places/'+id).then(response =>{
setPlace(response.data);
    });
  },[id]);
 
  if(!place){
    return <div>loading..</div> ;
  }

 
    return(
        <div className="mt-4 rounded-xl -mx-6 px-8 pt-8 bg-gray-100">
           <h1 className="text-2xl mr-36">{place.title}</h1>
           <a className="black my-3 flex gap-1 font-semibold underline" href={'https://maps.google.com/?q='+place.address}>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-5">
  <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
 </svg> {place.address}</a>

<PlaceGallery place={place}/>
   
   
   <div className="grid mb-6 gap-8 mt-8 sm:grid-cols-1 md:grid-cols-[2fr_1fr]">
    <div>
    <div className="mt-3">
    <h2 className="font-semibold text-2xl">Description</h2>
    {place.description}
   </div>
    Check-in: {place.checkIn}<br/>
    Check-out: {place.checkOut}<br/>
    max number of quest:{place.maxguest}
   </div>
    <div>
  <Bookingwidget place={place}/>
  </div>
   </div>
   <div className="bg-white -mx-8  p-8">

   <div> 
    <h2 className="font-semibold text-2xl">Extra Info</h2>
   </div>
   <div className="text-sm my-4 text-gray-700 leading-5">{place.extraInfo}</div>
  
   </div>
   

        </div>
    );
}