import React,{useRef} from 'react'
import '../Navbar/Navbar.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,
        faSquarePlus,
        faAngleLeft,
        faAngleRight  ,
        faCirclePlus
      } from "@fortawesome/free-solid-svg-icons";
      import {selectUser} from '../../features/userSlice'
      import { setUser } from "../../features/userSlice";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from "../../features/miscslices";
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
function Navbar({setActive,active}) {
  const nav = useNavigate();
  const dispatch = useDispatch()
    const handleLogout=()=>{
      dispatch(setUser(null));
      dispatch(setIsLoggedIn(false));
      nav('/login')
    }
    const user = useSelector(selectUser)
    const[imagchange,setimageChange]=useState(user)
    const fileInput = useRef(null);


   const fileHandler=async(e)=>{
    
    console.log("dsfsdf")
    
    const fieldval=e.target.files[0]
    let userimage={...user}
   userimage["image"]=fieldval.name
    console.log(userimage)
    console.log(fieldval)
    setimageChange(userimage)
    await axios.put(`http://localhost:3006/users/${user.id}`,imagchange)
    .then((res)=>{
                    console.log(res.data)
                    dispatch(setUser(imagchange));
                  })
    .catch((error)=>console.log("err"))
    
  }
  

  return (
    <div className='nav'>
    <div className="bx bx-menu" id="menu-icon" onClick={()=>{
      setActive(!active)
      let sidenavbar = document.querySelector('.sidebar');
      let content = document.querySelector('.main-container');
      let logo = document.querySelector('.big');
       
     logo.classList.toggle('active')
          sidenavbar.classList.toggle('active');
          content.classList.toggle('active');
    }}>
      
      { !active ?<FontAwesomeIcon icon={faAngleLeft} color="white"/>
      :<FontAwesomeIcon icon={faAngleRight} color="white"/>}
       <p style={{color: "#fff", fontSize:".5em"}}>Hello ,  {user.email} </p>
       
    </div>
          <div className='e'>
            <FontAwesomeIcon icon={faSquarePlus} size="3x" color="white" />
            <div className="profile" onClick={()=>document.querySelector('.profile-settings').classList.toggle('active')}>
                <img className='img_profile' src={require("../../assets/profil.png") /* user.imageUrl */} alt=""/>
                <div className="profile-settings">
                  <div className="profile-settings-header">
                  <div className="bg-iimage">
                 
                  </div>
                  <div className='a'>
                  <div className='profile-settings-img-div'>
                  <img className='profile-settings-header-img' src={require("../../assets/profil.png")/* user.imageUrl */} alt=""/>
                  <label className='imageupload'>
                  <input type="file" onChange={(e)=>fileHandler(e)} />
                  <FontAwesomeIcon  icon={faCirclePlus} />
                  </label>
                  </div>
                  <span>
                    <h5> name Here</h5>
                    <h5>{user.email}</h5>
                  </span>
                  </div>
                  <button onClick={()=>handleLogout()}>LOGOUT</button>
                  </div>
                  <div className='content'>
                    <h3>Activity</h3>
                    <p>Chat</p>
                  </div>
                </div>
            </div>
            </div>

    </div>
  )
}

export default Navbar