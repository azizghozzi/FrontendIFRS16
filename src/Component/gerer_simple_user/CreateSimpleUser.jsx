import React, { useState,useEffect } from 'react'

import '../gerer_users/Users.css'

import Input from '../general_component/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { loginhander } from '../../function/function'
import { setUser } from "../../features/userSlice";
import axios from 'axios'
import SelectInput from '../general_component/selectInput'
import { type } from '@testing-library/user-event/dist/type'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import Pending from '../general_component/pending'
const CreateSimpleUser= ({setState,getdata,view,update,data }) => {
    const type=useSelector(selectUser)
    const [user,setUser]=useState(data)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [pending,setPending ] = useState(false)
    const postuser= async ()=>{
        setPending(true)
        await axios.all([
            axios.post("http://localhost:3006/users",
            {email:user.email,
             password:user.password,
             type:type.type+1,
             token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmEyODEwZjQyZTU1NzRhZWM2ZWUyNTIiLCJpYXQiOjE2NTUwNzQzMzksImV4cCI6MTY1NTE2MDczOX0.q3durcVUSB8Z-mE1TkuWNLB4_BH4iVPsvUP2sOgHtGI"
         }),
           
             axios.post('http://localhost:3006/simpleUsers',user)
        ])
        .then((res)=>{
            setPending(false)
           console.log("created")
           document.getElementById("form").reset()
           
           getdata()
        })
        .catch((error)=>console.log(error))
    }
    const updateData=async()=>{
        setPending(true)
        await axios.put(`http://localhost:3006/simpleUsers/${user.id}`,user)
        .then((resp)=>
            {console.log(resp) 
                getdata()
                setPending(false)
                setState(false)})
        .catch((err)=>console.log(err))
    }
 
const submitForm =(e)=>{
    e.preventDefault()
    update?updateData():
    postuser()
    document.getElementById("form").reset();

    console.log("email",password)
  
}
const inputs =[
    {
        "label":"Username",
        "name":"userName",
        "type":"text",
    },
    {
        "label":"email",
        "name":"email",
        "type":"email",
    },
    {
        "label":"Password",
        "name":"password",
        "type":"text",
    },
    {
        "label":"Date Created",
        "name":"dateCreated",
        "type":"date",
    }
    
]
const handleField = (e) => {
    e.preventDefault();
    const fieldname = e.target.getAttribute('name');
    let fieldval= e.target.value;
    if(fieldname==="Status")
    fieldval=parseInt(fieldval)
   
    const newuser_data={...user};
    newuser_data[fieldname] = fieldval;
    setUser(newuser_data);
};
    return(
        <div className='formdiv'>
            {pending&& <Pending/> }
           <form onSubmit={submitForm} id="form">
                <div className="user_create_form">

                    {inputs.map((input,key)=>{
                       
                        return( 
                            <div key={key} className='input_div'>
                            <Input 
                                
                                setContract={setUser}
                                contract={user}
                                labelLeft={input.label}
                                name={input.name}
                                defaultValue={user[input.name]}
                                type={input.type}
                                disabled={view ?true:false}
                                handleField={handleField}
                                //onChange={handleField}
                                />
                                </div>
                        )
                    })}
                </div>
               {/*  <input type='submit' className='submit_user' value="Submit"/>  */}
                    
                   { !view? <Input type="submit" className="submitlabel"/>
                   : <button className="Quit" onClick={( )=>setState(false)}> quite</button>}
                        
               
                   {/* 
                        <button type='submit' className='submit_user dele'> 
                            Confirm
                        </button> */}
        </form>
        </div>
    )
}


export default CreateSimpleUser