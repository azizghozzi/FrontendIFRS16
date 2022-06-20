import React,{useEffect} from 'react'
import Table from '../general_component/table'
import axios from 'axios'
import { useState } from 'react'
import {selectUser} from '../../features/userSlice'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from '../../Component/general_component/modal'
import CreateContract from './create_contract'
import Pending from '../general_component/pending'

export  const Action =( {handleAdd,handleEdite})=>{
    return(
    <>
        <button className='action_btn view' onClick={()=>{ handleAdd(true)}}>View</button> 
        <button className='action_btn upd' onClick={()=>{ handleEdite(true)}}>update</button>
        <button className='action_btn del' onClick={()=>{ }}>delete</button>
    </>)
}
function Gerer_Contrat() {
    const[add,setAdd]=useState(false)
    const[update,setUpdate]=useState(false)
    const[view,setView]=useState(false)
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [data,setData]=useState([])
    const[selectedData,setSelectedData]=useState()
    const [contract,setContract]=useState({
        
        "ContractRef":"",
        "Ifrss16Duration":"",
        "AnnualRent":"",
        "PayementFrequency":"",
        "DiscountRate":"",
        "MonthsNumber":"",
        "AnnualIncrease":"",
        "IncreaseFrequency":"",
        "IncreaseDate":"",
        "PreExpensesPeriod":"",
        "StartDate":"",
        "EndDate":"",
        "PreExpensesPaymentDate":"",
        "DateExcuteUpdate":"",
        "DateRef":"",
        "increaseDate":""
    })
    const [pending,setPending ] = useState(false)
const [confirm,setConfirm]=useState({
    confirm:false,
    id:null,
    nom:null
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
    if(action){

        setPending(true)
        const resp = await axios.delete(`http://localhost:3006/contracts/${confirm.id}`)
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
    const getdata = async ()=>{
        
            await axios.get("http://localhost:3006/contracts")
         .then((res)=>setData(res.data))
         .catch((err)=>console.log(err))
         }

    
    useEffect(() => {
       getdata()
    
    },[])
    
  
    
    const adminCOLUMNS = [
        { Header: "Contract reference", accessor: "ContractRef" },
        { Header: "Annual Rent", accessor: "AnnualRent" },
        { Header: "Start Date", accessor: "StartDate" },
        { Header: "end Date", accessor: "EndDate"} 
    ];
    
  return (
    <div className='users'>
        {confirm.confirm &&
            <Modal
            setState={setConfirm}
                modal_name="Confirm deletion"
                children={<div>
                    <h3
                    style={{margin:"15px"}} 
                    >are you sure to delete Contract {selectedData.ContractRef} </h3>
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
             ADD Contract</button>
       { user.type === 0 ?
       {/* <Table  datas={data} 
        setSelectedData={setSelectedData} 
        
        COLUMNS={sadminCOLUMNS}
        handleDelete={null}
        handleEdite={setUpdate}
        /> */}
    :  user.type === 1 || user.type ===2 ?
    <Table  
        datas={data} 
        COLUMNS={adminCOLUMNS}
        handleEdite={setUpdate}
        handleDelete={handleDelete}
        setSelectedData={setSelectedData} 
        setView={setView}
        /* update={setUpdate} 
        deleted={setDeleted} */ 
        />
        :<></>
    }
    {
        add?
        <Modal 
        setState={setAdd} 
        modal_name="Create Contract" 
        children={
            <CreateContract  
            setContract={setContract} 
            contract={contract}
            getdata={getdata}
            update={false} 
            view={view} 
            />
        }
        />:
        
        update?
        <Modal 
            setState={setUpdate} 
            modal_name="Update Contract" 
            children=
            {
                <CreateContract 
                setState={setUpdate} 
                setContract={setSelectedData} 
                contract={selectedData}
                getdata={getdata}
                update={true} 
                view={view} 
                />
            }
            />:
        <></>

    }
    {view?
        <Modal 
            setState={setView} 
            modal_name="Update Contract" 
            children=
            {
                <CreateContract 
                setState={setView} 
                setContract={setContract} 
                contract={selectedData}
                update={false} 
                view={view} 
                />
            }
            />:
        <></>

    }


    </div>
  )
}

export default Gerer_Contrat
/* ContractRef={ContractRef}
        Ifrss16Duration={Ifrss16Duration}
        AnnualRent={AnnualRent}
        PayementFrequency={PayementFrequency}
        DiscountRate={DiscountRate}
        MonthsNumber={MonthsNumber}
        AnnualIncrease={AnnualIncrease}
        IncreaseFrequency={IncreaseFrequency}
        IncreaseDate={IncreaseDate}
        PreExpensesPeriod={PreExpensesPeriod}
        StartDate={StartDate}
        EndDate={EndDate}
        PreExpensesPaymentDate={PreExpensesPaymentDate}
        DateExcuteUpdate={DateExcuteUpdate}
        DateRef={DateRef}
        increaseDate={increaseDate}
        setContract_ref={setContract_ref}
        setIfrss16Duration={setIfrss16Duration}
        setAnnualRent={setAnnualRent}
        setPayementFrequency={setPayementFrequency}
        setDiscountRate={setDiscountRate}
        setMonthsNumber={setMonthsNumber}
        setAnnualIncrease={setAnnualIncrease}
        setIncreaseFrequency={setIncreaseFrequency}
        setIncreaseDatee={setIncreaseDatee}
        setPreExpensesPeriod={setPreExpensesPeriod}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setPreExpensesPaymentDate={setPreExpensesPaymentDate}
        setDateExcuteUpdate={setDateExcuteUpdate}
        setDateRef={setDateRef}
        setIncreaseDate={setIncreaseDate} */