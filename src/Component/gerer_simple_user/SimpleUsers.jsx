import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Table from '../general_component/table'
import '../gerer_users/Users.css'
import Modal from '../general_component/modal'
import axios from 'axios'
import { useEffect } from 'react'
import Pending from '../general_component/pending'
import CreateSimpleUser from './CreateSimpleUser'
function SimpleUsers() {
    const[add,setAdd]=useState(false)
    const[view,setView]=useState(false)
    const[update,setUpdate]=useState(false)
    const [user,setUser]=useState([])
    const[deleted,setDeleted]=useState(false)
    const [selectedData,setSelectedData]=useState({})
    const [pending,setPending ] = useState(false)
    const [confirm,setConfirm]=useState({
        confirm:false,
        id:null,
        nom:null
    })
    const getdata = async ()=>{
        setPending(true)
        const accessToken =localStorage.getItem("SECRET_TOKEN")
        axios.get('http://localhost:3006/simpleUsers',{
        
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        }).then((res)=>{ setUser(res.data)  
             setPending(false) 
        }) 
    }
    const [userdata,setuserData]=useState({
        "userName":"",
        "email":"",
        "password":"",
        "dateCreated":""
    })
    const handleDelete = (id,nom) => {
        setConfirm({
            confirm:true,
            id:id,
            nom:nom
        })
        console.log(confirm)
    };
    const confirmAction= async (action)=>{
        console.log(userdata)
        console.log(confirm.id)
        if(action){
    
            setPending(true)
            const resp = await axios.delete(`http://localhost:3006/simpleUsers/${confirm.id}`)
            .then((res)=>{ 
                getdata();
                setPending(false)
               
            })
            .catch((err)=>console.log(err))
            console.log("Delete successful");
            setConfirm({
                confirm:false,
                id:null,
                nom:null
            })
        }
        else  setConfirm({
            confirm:false,
            id:null,
            nom:null
        })
    
    }
    
    useEffect(()=>{
        getdata()
    },[])
    const COLUMNS = [
        { Header: "userName", accessor: "userName" },
        { Header: "Email", accessor: "email" },
        { Header: "password", accessor: "password" },
        { Header: "creation Date", accessor: "dateCreated" },
    ];
    
        return(
            <div className="users">
                {confirm.confirm &&
                <Modal
                setState={setConfirm}
                    modal_name="Confirm deletion"
                    children={<div>
                        <h3
                        style={{margin:"15px"}} 
                        >are you sure to delete the User : {selectedData.userName} </h3>
                        <button onClick={()=>confirmAction(true)}
                            style={{
                            outline:"none",
                            border:"none",
                            padding:"5px",
                            backgroundColor:"#c13131",
                            marginRight:"10px",
                            width:"100px",color:"#fff"
                        }} >confirm</button>
                        <button onClick={()=>setConfirm({
                                confirm:false,
                                id:null,
                                nom:null
                            })}
                        style={{
                           
                            outline:"none",
                            border:"none",
                            padding:"5px",
                            backgroundColor:"#0b700b",
                            width:"100px",color:"#fff"
                        }}>quit</button>
                    </div>}
                />
                }
                {pending&& <Pending/> }
                <button onClick={()=>setAdd(true)}> 
                 <FontAwesomeIcon icon={faPlus} size="2x" className='icon'/> 
                 ADD User</button>
                <Table 
                datas={user} 
                COLUMNS={COLUMNS} 
                handleEdite={setUpdate} 
                handleDelete ={handleDelete }
                //handleAdd={setAdd}
                setSelectedData={setSelectedData}
                setView={setView}
                
                />
                {
                    add?
                    <Modal 
                    setState={setAdd} 
                    modal_name="Create User" 
                    children={<CreateSimpleUser 
                        data={userdata} 
                        update={false} 
                        view={view}  
                        getdata={getdata}/>}/>:
                    <></>
                }
                {
                update?
                   <Modal 
                    setState={setUpdate} 
                    modal_name="Update User" 
                    children={<CreateSimpleUser 
                            setState={setUpdate} 
                            data={selectedData} 
                            update={true} 
                            view={view} 
                            getdata={getdata}/>
                    }/>
                   :
                   <></>
                    }
                    {
                    view?
                    <Modal 
                    setState={setView} 
                    modal_name="View User"
                    
                    children={<CreateSimpleUser  
                        setState={setView} 
                        view={view} 
                        data={selectedData} 
                        update={false} 
                        getdata={getdata}/>
                    }/>
                   :
                   <></>
    
                    }
            </div>
        )
}

export default SimpleUsers