import { useState } from "react";
export default function PlaceGallery({place}){
    const [showphotos,setShowPhotos]=useState(false);
    if(showphotos){
        return(
          <div className="absolute bg-black inset-0 text-white  min-h-screen">
            Show photos
          <div className="p-8 grid gap-4 bg-black"> 
          <div>
            <h2 className="text-2xl ">Photos of {place.title} </h2>
            <button onClick={()=>setShowPhotos(false)}  className="fixed right-12 top-8 flex gap-1 py-2 px-4  rounded-xl bg-white text-black shadow  shadow-black">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
      <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
    </svg>
      Close photos</button>
          </div>
            {place?.photos?.length>0 && place.photos.map(photo=>(
          <div>
           <img src={'http://localhost:3000/uploads/'+photo} alt=""/>
         </div>
    
          ))}</div>
         
          </div>
        )
      }
    return(
        <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
         <div>{place.photos?.[0] &&(
           <div>
           <img onClick={()=>setShowPhotos(true)} className="aspect-square object-cover cursor-pointer" src={"http://localhost:3000/uploads/"+place.photos[0]} alt=""/>
           </div>
         )}</div>
         <div className="grid ">
          {place.photos?.[1] &&(
           <img onClick={()=>setShowPhotos(true)} className="aspect-square object-cover cursor-pointer" src={"http://localhost:3000/uploads/"+place.photos[1]} alt=""/>
         )}
         <div className="overflow-hidden">
          {place.photos?.[2] &&(
           <img onClick={()=>setShowPhotos(true)} className="aspect-square relative top-2 object-cover cursor-pointer" src={"http://localhost:3000/uploads/"+place.photos[2]} alt=""/>
         )}
         </div>
         </div>
        </div>
        <button onClick={()=>setShowPhotos(true)} className="absolute bg-white rounded-xl px-4 py-1 bottom-2 right-1 shadow shadow-md shadow-black flex gap-1">
         <svg className="pr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
         <path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" />
       </svg>
       Show more photos</button>
        </div>
    )
}