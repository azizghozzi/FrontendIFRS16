import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import Table from '../general_component/table'
import './Users.css'
import Modal from '../general_component/modal'
import CreateUser from './CreateUser'
import axios from 'axios'
import { useEffect } from 'react'
import Pending from '../general_component/pending'
export const Btn =(val)=>{
 
    
    return(
        <div className={`statustable ${val.val === 0? "pending":val.val===1?"activee": val.val === -1?"inactive":""}`}>
            <p>
                {val.val === 0? "Pending":val.val===1?"Active":"Inactive"}
            </p>
        </div>
    )
}
 const Users = () => {
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
    axios.get('http://localhost:3006/accounts',{
    
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
    }).then((res)=>{ setUser(res.data)  
         setPending(false) 
    }) 
}
const [userdata,setuserData]=useState({
        
    "password":"",
    "entreprise":"",
    "region":"",
    "status":null,
    "dateCreated":"",
    "endDate":"",
    "tel":"",
    "email":""
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
        const resp = await axios.delete(`http://localhost:3006/accounts/${confirm.id}`)
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
    { Header: "Entreprise", accessor: "entreprise" },
    { Header: "Email", accessor: "email" },
    { Header: "Telephone", accessor: "tel" },
    { Header: "Created Date", accessor: "dateCreated" },
    { Header: "end Date", accessor: "endDate" },
    { Header: "status", accessor: "status",Cell:(props) => <Btn val ={parseInt(props.value)}/>} 
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
                    >are you sure to delete {selectedData.entreprise} </h3>
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
             ADD Account</button>
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
                children={<CreateUser 
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
                children={<CreateUser 
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
                
                children={<CreateUser 
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
export default Users