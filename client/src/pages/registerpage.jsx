import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";



function Registerpage(){
  const navigate=useNavigate()
   const [data,setData]=useState({
    name:'',
    email:'',
    password:'',
  })
    const RegisterUser= async(ev)=>{
     ev.preventDefault();
     const {name,email,password}=data
     try{
   const {data}=await axios.post('/register',{
    name,email,password,
   })
    if(data.error){
      alert(data.error)
    }
    else{
    setData({})
   alert("successfull")
      navigate('/login')
  }
     }catch(ev){
         alert("registered unsuccessfull")
      } 
      }
  
    
    return(
        <div className="mt-5 flex grow items-center justify-around">
        <div className="mb-32">
       <h1 className="text-4xl text-center mb-5">Register</h1>
       <form className=" max-w-md  mx-auto"  onSubmit={RegisterUser}>
        <input type="text" placeholder="Enter your name" value={data.name} onChange={(ev)=>setData({...data,name:ev.target.value})}/>
        <input type="email" placeholder="your@email.com" value={data.email} onChange={(ev)=>setData({...data,email:ev.target.value})}/>
        <input type="password" placeholder="*******" value={data.password} onChange={(ev)=>setData({...data,password:ev.target.value})}/>
        <button className="bg-prim font-bold border-2 border-black shadow-lg shadow-gray-500 w-full mt-3 rounded-lg" >Register</button>
        </form>
        <div className="text-center py-2 text-gray-500">Already a member? 
         <Link to={'/Login'} className="underline text-black">Login</Link>
        </div>
        </div>
        </div>
    )
}

export default Registerpage;