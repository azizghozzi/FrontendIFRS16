import React, { useState,useEffect } from 'react'
import './Users.css'
import './create_user.css'
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

const CreateUser = ({setState,getdata,view,onChangeForm, createUser,update,data,deleted }) => {
    const type=useSelector(selectUser)
    const [user,setUser]=useState(data)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [pending,setPending ] = useState(false)
    const postuser= async ()=>{
        setPending(true)
        await axios.all([
            axios.post("http://localhost:3006/users", //ta3mel el user eli bech nlogini bih
            {email:user.email,
             password:user.password,
             type:type.type+1,
             token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmEyODEwZjQyZTU1NzRhZWM2ZWUyNTIiLCJpYXQiOjE2NTUwNzQzMzksImV4cCI6MTY1NTE2MDczOX0.q3durcVUSB8Z-mE1TkuWNLB4_BH4iVPsvUP2sOgHtGI"
         }),
           
             axios.post('http://localhost:3006/accounts',user)
        ])
        .then((res)=>{
            setPending(false)
           console.log("created")
            getdata()
            document.getElementById("form").reset();})
        .catch((error)=>console.log(error))
    }
    const updateData=async()=>{
        setPending(true)
        await axios.put(`http://localhost:3006/accounts/${user.id}`,user)
        .then((resp)=>
            {console.log(resp) 
                setPending(false)
                setState(false)})
        .catch((err)=>console.log(err))
    }
 
const submitForm =(e)=>{
    e.preventDefault()
    update?updateData():
    postuser()
    getdata()
    console.log(email,password)
  
}
const inputs =[
    {
        "label":"entreprise",
        "name":"entreprise",
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
        "label":"Tel",
        "name":"tel",
        "type":"tel",
    },
    {
        "label":"Date Created",
        "name":"dateCreated",
        "type":"date",
    },
    {
        "label":"end Date",
        "name":"endDate",
        "type":"date",
    },
   
    {
        "label":"region",
        "name":"region",
        "type":"text",
    },
    
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
                    <div className='input_div'>

                    <SelectInput
                    
                    name="status"
                    label="status"
                    value={user.status}
                    handleField={handleField}
                    options={[
                        {
                            "label":"Pending",
                            "className":"pending",
                            "value":0
                        },
                        {
                            "label":"Active",
                            "className":"valid",
                            "value":1
                        },
                        {
                            "label":"Inactive",
                            "className":"invalid",
                            "value":-1
                        }
                    ]}
                    disabled={view ?true:false}
                    />
                    </div>
                    
                </div>
               {/*  <input type='submit' className='submit_user' value="Submit"/>  */}
                    
                    <Input type="submit" className="submitlabel"/>
                        
               
                   {/* 
                        <button type='submit' className='submit_user dele'> 
                            Confirm
                        </button> */}
        </form>
        </div>
    )
}

export default CreateUser