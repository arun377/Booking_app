
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Indexpage from './pages/indexpage'
import Loginpage from './pages/loginpage'
import Layout from './Layout'
import Registerpage from './pages/registerpage'
import axios from 'axios'
import {UserContextProvider} from '../context/userContext';
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import ProfilePage from './pages/ProfilePage'
import PlacePage from './pages/placepage'
import BookingPage from './pages/BookingPage'
import BookingsPage from './pages/BookingsPage'
// import {Toaster} from 'react-hot-toast';

axios.defaults.baseURL='http://localhost:3000';
axios.defaults.withCredentials=true;


function App() {

  return (
    <UserContextProvider>
    <Routes>
       {/* <Toaster position='bottom-right'  toastOptions={{duration:2000}}/> */}
      <Route path="/" element={<Layout/>}>
     <Route index element={<Indexpage/>}/>
    <Route path="/login" element={<Loginpage/>}/>
    <Route path="/register" element={<Registerpage/>}/>
    {/* <Route path="/account/:subpage?" element={<AccountPage/>}/>
    <Route path="/account/:subpage/:action" element={<AccountPage/>}/> */}
     {/* <Route path="/account/bookings" element={<AccountPage/>}/> */}
     <Route path="/account" element={<ProfilePage/>}/> 
    <Route path="/account/places" element={<PlacesPage/>}/> 
    <Route path="/account/places/new" element={<PlacesFormPage/>}/> 
    <Route path="/account/places/:id" element={<PlacesFormPage/>}/> 
    <Route path="/place/:id" element={<PlacePage/>} />
    <Route path="/account/bookings" element={<BookingsPage/>}/>
    <Route path="/account/booking/:id" element={<BookingPage/>}/>
    </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App
