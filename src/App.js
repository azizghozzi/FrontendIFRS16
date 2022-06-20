import './App.css';
import * as React from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import Dashbord from './Component/Dashbord/Dashbord';
import { useState } from 'react';
import Login from './Pages/Login/Login';
import Sidebar from './Pages/sidebar/sidebar';
import { BrowserRouter as Router, Routes, Route,Navigate, Outlet } from "react-router-dom";
import Users from './Component/gerer_users/Users';
import Navbar from './Pages/Navbar/Navbar';
import { selectUser } from './features/userSlice';
import Gerer_Contrat from './Component/Gerer_Contrat/Gerer_Contrat';
import Customers from './Component/customers/Customers';
import SimpleUsers from './Component/gerer_simple_user/SimpleUsers';
const Layout = ({active,setActive})=>{
  return(
    <>
    <div className='dashbord'>
                <Sidebar  active={active} />
                <div className="main-container">
                  <Navbar setActive={setActive} active={active}/>
                  <div className="container">
                      <Outlet/> {/* // router lkol yetsabou feha */}
                  </div>
                </div>
              </div>
    </>
  )
}

function App() {
  const[active, setActive]=useState(false) //STATE bech nkaber wnsagher sidebar
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
  const type=useSelector(selectUser)

  //const [isLoggedIn, setLoggedIn] =useState(false)
  return (
    <div className="App">
         <Router>
          <Routes>
              {
                isLoggedIn ?
                <>
                <Route element={<Layout setActive={setActive} active={active}/>}>
                <Route  exacte path="/" element= {<Dashbord  />}/>
                { type.type === 1? 
                <Route   path="/users-management/" element= {<SimpleUsers />}/>
                :<></>}
                <Route   path="/output-contact/" element= {<Dashbord  />}/>
                <Route   path="/contract-management/" element= {<Gerer_Contrat/>}/>
                <Route   path="/deadline-management/" element= {<Dashbord  />}/>
                <Route   path="/paramaitre/" element= {<Dashbord  />}/>
                <Route   path="/accounts" element={<Users/>} />
                <Route   path="/customers" element={<Customers />} />
                <Route   path="/*" element={<Navigate to="/" />}/>
                </Route>
                </>
                :
                <>
                <Route path="/login" element={<Login/>} > </Route>
                <Route   path="/*" element={<Navigate to="/login" />}/>
                </>
              }

          </Routes>
          <Routes>

          </Routes>
         </Router>
    </div>
  )
}
export default App;
