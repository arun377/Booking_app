import { Link,  Navigate } from "react-router-dom";
import React from "react";
import { useState,useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext.jsx";


function Loginpage() {
    
    const [redirect,setRedirect]=useState(false);
    const {setUser}=useContext(UserContext);
    const [data,setData]=useState({
     email:'',
     password:'',
   })

const handlelogin= async(ev)=>{ 
    ev.preventDefault();
    const {email,password}=data
    try {
        const {data} = await axios.post('/login', {email,password});
        setUser(data);
        alert('Login successful');
        setRedirect(true);
      } catch (e) {
        alert('Login failed');
      }
    }
  
    if (redirect) {
      return <Navigate to={'/'} />
    }
       
   
    return(
    <div className="mt-5 flex grow items-center justify-around">
        <div className="mb-32">
       <h1 className="text-4xl text-center mb-5">Login</h1>
       <form className=" max-w-md  mx-auto " onSubmit={handlelogin}>
        <input type="email" placeholder="your@email.com"  onChange={(ev)=>setData({...data,email:ev.target.value})}/>
        <input type="password" placeholder="*******"     onChange={(ev)=>setData({...data,password:ev.target.value})}/>
        <button className="bg-prim font-bold border-2 border-black shadow-lg shadow-gray-500 w-full mt-3 rounded-lg"  >Login</button>
        </form>
        <div className="text-center py-2 text-gray-500">Don't have an account yet? 
         <Link to={'/register'} className="underline text-black">Register now</Link>
        </div>
        </div>
        
        </div>
        )
}

export default Loginpage;