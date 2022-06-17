import React from "react";
import './errormodal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
const Errormodel = ({text})=>{


    return(
        <div className="errorModal " id="mod">
                {text}
                <div className="iconpop" onClick={()=>document.getElementById("mod").classList.remove("show")}><FontAwesomeIcon icon={faX}/></div>
        </div>
    )
}
export default Errormodel