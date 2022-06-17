import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Table from '../general_component/table'
function Customers() {
    const [data,setData]=useState([])
    const COLUMNS = [
        { Header: "Entreprise", accessor: "entreprise" },
        { Header: "users", accessor: "users" },
        { Header: "contracts", accessor: "contracts" }
    ];
    const getdata=async()=>{
        await axios.get("http://localhost:3006/customers")
        .then((err)=>setData(err.data))
        .catch((error)=>console.log(error))
    }
    useEffect(()=>{
       getdata()
    },[])
  return (
    <div style={{width:"80%",margin:"15px"}}>
        
        <Table 
            datas={data} 
            COLUMNS={COLUMNS}
            action={true}
        />

    </div>
  )
}

export default Customers