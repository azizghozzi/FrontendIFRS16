import React from "react";
import "./modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Component } from "react";
import { useEffect } from "react";

const Modal = (props) => {
    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return()=>{
            document.body.style.overflow = 'unset';
        }
    },[])
    const { children, setState,modal_name } = props;
    const hideModal = () => setState(false);
    return (
        <div className="modal-container" onClick={hideModal}>
            <div onClick={(e) => e.stopPropagation()} className="modal">
               <div className="modal_header">
                   <h3>{modal_name}</h3>
                   <FontAwesomeIcon
                    className="icon"
                    icon={faTimes}
                    onClick={hideModal}
                    />
                </div >
                <div className="core">
                {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;