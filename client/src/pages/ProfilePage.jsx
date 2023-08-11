import { useContext,useState } from "react"
import { UserContext } from "../../context/userContext";
import { Navigate, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";



export default function ProfilePage(){
    const {ready,user,setUser}=useContext(UserContext);
    let  {subpage}=useParams();
    const [redirect,setRedirect]=useState(null);

    if(subpage===undefined){
 
        subpage ='profile';
    }

    async function logout(){
        await axios.post('/logout');
        
        setRedirect('/');
        setUser(null);
    }

    if(!ready){
        return 'loading....';
    }
    if(ready && !user && !redirect){
     return<Navigate to={'/login'}/>
    }
   
    
  
   if(redirect){
    return <Navigate to={redirect}/>
    }

    return(
        <div>
           
            <AccountNav/>
                {subpage === 'profile' &&(
                    <div className="text-center p-2 mx-auto max-w-lg mt-8">
                        Logged in as {user.name} ({user.email})
                        <br/>
                        <button onClick={logout} className="bg-prim mt-3 max-w-sm w-full font-bold border-2 border-black shadow-lg shadow-gray-500 w-full mt-3 rounded-lg" >Logout</button>
                        </div>
                )}
                {subpage === 'places' && (
                    <PlacesPage/>
                )}
            
        </div>
    )
}