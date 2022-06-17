import React , {useState} from "react";

import '../Login/Login.css'
import { loginhander } from "../../function/function";
import {handleErrorShow} from '../../function/formValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faE, faExclamationCircle,faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Errormodel from "../../Component/general_component/errormodel";
import im from '../../assets/z.png'
import Input from "../../Component/general_component/input";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import { setIsLoggedIn } from "../../features/miscslices";
import Pending from "../../Component/general_component/pending";
import axiosInstance from '../../utils/auth'
const Login = (props)=>{
    const {logged}= props
    const dispatch = useDispatch();
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [showPassword,setShowPassword] = useState(false)
  const [res,setRes]= useState([])
  const[err,seterr]=useState(false)
  const [pending,setPending]=useState(false)
  const nav = useNavigate()
 /*  const getusers = ()=>{
    
    axios.get('users.json')
        .then(function (response) {
        // handle success
        console.log(response.data)
        
        setRes(response.data)
        })
        .catch(function (error) {
        // handle error
        console.log("error");
        });
    
  } */
  let [errorText,seterrorText] =useState("")

const fing = async()=>{
    setPending(true)
    await axios.get("http://localhost:3006/users")
    .then((response)=>{
        const ress = [...response.data]
        ress.forEach(user=>{
            if(user.email === email && user.password === password ){
            localStorage.setItem("SECRET_TOKEN", user.token)
            dispatch(setUser(user));
            dispatch(setIsLoggedIn(true));
            setPending(false)
            nav("/")
            
        }
        else{
            seterrorText("invalid user or password")
            setPending(false)
            seterr(true)
        }})
    })
    .catch((error)=>{
        seterrorText("network error")
        setPending(false)
        seterr(true)
    })
}
const submitForm =(e)=>{
    //t5ali submit maya3melch refrech
   e.preventDefault()
   
    
    /* axiosInstance.post('auth/login',{email,password})
            .then((res)=>{ 
                if (res.status === 200) {
                console.log(res.data)
                dispatch(setUser(res.data));
                dispatch(setIsLoggedIn(true));
                <Navigate to="/" replace={true} />
            }}); */
            fing()
   /*  console.log("email or pass incorrect")
    document.getElementById("mod").classList.add("show") */
}

  

const setemail =()=>{
    //bech ta9ra eli tekteb fel input

const eml =document.getElementById("email").value ;

setEmail(eml)
}


//bech nab3eth objet fih email pass acc tokol 
const setpaswword =()=>{
    const eml=document.getElementById("password").value ;
    //console.log(eml)
    setPassword(eml)
}
    return(
        <>
        {pending ? <Pending/>:<></>}
        {err ? <Errormodel text={errorText}/>:<></>}
        
        <div className="login-container">
        <div className="logo_login">
           <img src={require("../../assets/z.png")} alt="zzz" srcSet="" />
        </div>
        <form onSubmit={submitForm}>
            <div className="form_header">
                <h2>Welcome to EY Platform </h2>
                <p>LOGIN</p>
            </div>
            <div className="form_body">

                <Input 
                login={true}
                    labelLeft="Email:"
                    type="email"
                    name="email"
                    value={email}
                    onChange={setEmail}
                    className='label'
                    />
                    <Input 
                    login={true}
                    labelLeft="Password:"
                    className='label'
                    type={showPassword? "text":"password"}
                    name="password"
                    value={password}
                    onChange={setPassword}
                    children={<FontAwesomeIcon icon={showPassword? faEye:faEyeSlash} className="aez" onClick={()=>setShowPassword(!showPassword)}/>}
                    />
                    
                    <div className="params">
                    <label className="chekbox" > 
                        
                        <input
                            type="checkbox" 
                            name="submit" 
                            className="text-input"
                            onClick={()=>console.log("clkj")}
                        /> 
                        Remember me   
                    </label>
                        <p>forgot password?</p>
                    </div>
                    <div className="aa">
                    <input
                            type="submit" 
                            name="submit" 
                            className="submit"
                            value="Login"
                        /> 
                    </div>
                </div>
        </form>
    </div>
    </>
    )
}
export default Login