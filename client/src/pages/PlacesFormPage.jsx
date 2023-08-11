import Perks from "../perks";
import PhotosUploader from "../photouploader";
import {useState} from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";

      

export default function PlacesFormPage(){
    
const {id}=useParams();    
const [title,setTitle]=useState('');
const [address,setAddress]=useState('');
const [addedPhotos,setAddedPhotos]=useState([]);
const [description,setDescription]=useState('');
const [perks,setPerks]=useState([]);
const [extraInfo,setExtraInfo]=useState('');
const [checkIn,setCheckIn]=useState('');
const [checkOut,setCheckOut]=useState('');
const [maxguest,setMaxguest]=useState(1);
const [price,setPrice]=useState(1000);
const [redirect,setRedirect]=useState(false);
useEffect(()=>{
if(!id){
    return;
}
axios.get('/places/'+id).then(response=>{
const {data}=response;
setTitle(data.title);
setAddress(data.address);
setDescription(data.description);
setAddedPhotos(data.photos);
setPerks(data.perks);
setExtraInfo(data.extraInfo);
setCheckIn(data.checkIn);
setCheckOut(data.checkOut);
setMaxguest(data.maxguest);
setPrice(data.price);
});
},[id]);
async function savePlace(ev){
    ev.preventDefault(); 
    const placeData= { title,address,addedPhotos,
    description,perks,extraInfo,
    checkIn,checkOut,maxguest,price};
    if(id){
        //update
        await axios.put('/places',{
            id, ...placeData
         });
         setRedirect(true);
    }
    else{
//new place
    await axios.post('/places',{
    ...placeData
  });
  setRedirect(true);
}
  }
 if(redirect){
    return <Navigate to={'/account/places'}/>
 }
    return(
        <div>
            <AccountNav/>
        <form onSubmit={savePlace}>
            <h2 className="text-2xl">Title</h2>
            <p className="text-gray-500 text-sm">Title should be catchy and new to advertise</p>
            <input type="text" placeholder="title, for example: My lovely flat" value={title} onChange={ev=>setTitle(ev.target.value)}/>
            <h2 className="text-2xl" >Address</h2>
            <p className="text-gray-500 text-sm">Give a correct Address,if anything has two name,just put it on (bracket)</p>
            <input type="text" placeholder="address" value={address} onChange={ev=>setAddress(ev.target.value)}/>
            <h2 className="text-2xl">photos</h2>
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
           
            <h2 className="text-2xl" >Description</h2>
            <p className="text-gray-500 text-sm">discription of the place</p>
            <textarea value={description} onChange={ev=>setDescription(ev.target.value)}></textarea>
            <h2 className="text-2xl" >perks</h2>
            <p className="text-gray-500 text-sm">select all the perks of your place</p>
            <Perks selected={perks} onChange={setPerks}/>
            
            <h2 className="text-2xl">Extra info</h2>
            <p className="text-gray-500 text-sm">rules,maintenance Announcement etc</p>
            <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>
            <h2 className="text-2xl">Check in & Check out times</h2>
            <p className="text-gray-500 text-sm">the time that people need to leave </p>

           <div className="grid gap-2 sm:grid-cols-1  md:grid-cols-4">
            
            <div>
                <h2>check in</h2>
            <input type="text"  placeholder="7.00" className="mt-2 mb-1" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)}/>
            </div>

            <div>
            <h2>check out</h2>
            <input type="text"  placeholder="19:50" className="mt-2 mb-1" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}/>
            </div>

            <div>
            <h2>Max number of guest</h2>
            <input type="number"   className="mt-2 mb-1" value={maxguest} onChange={ev=>setMaxguest(ev.target.value)}/>
            </div>

            <div>
            <h2>Price per day</h2>
            <input type="number"   className="mt-2 mb-1" value={price} onChange={ev=>setPrice(ev.target.value)}/>
            </div>
            
           </div>

           <div >
                <button className="bg-prim1 py-2  w-full  mt-2 rounded-xl gap-1  text-white">save</button>
            </div>
        </form>
        </div>
    );
}