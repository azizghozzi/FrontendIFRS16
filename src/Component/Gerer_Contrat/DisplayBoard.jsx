import React from 'react'
import Navbar from '../../Pages/Navbar/Navbar'
import '../Gerer_Contrat/Users.css'
export const DisplayBoard = ({numberOfUsers, getAllUsers}) => {

   
    return(
        <div style={{backgroundColor:'black'}} className="display-board">
            <h4 style={{color: 'white'}}>Users Created</h4>
            <div className="number">
           {/*  {numberOfUsers} */} 11
            </div>
           
                <button type="button" onClick={(e) => getAllUsers()} className="button">Get all Users</button>
            
        </div>
    )
}