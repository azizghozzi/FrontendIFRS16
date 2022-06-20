import React,{useState} from 'react'
import Input from '../../Component/general_component/input'
import './createcontract.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import axiosInstance from '../../utils/auth'
import axios from 'axios'
import Pending from '../general_component/pending'
import { useEffect } from 'react'
function CreateContract(props) {
    const {
    setContract,contract,getdata,view,update,setState
    }=props

const [data,setData]=useState()

const [pending,setPending ] = useState(false)
const set1 =[
    {
        "label":"Contract Ref",
        "name":"ContractRef",
        "type":"text",
    },
    {
        "label":"Duration Retained Under IFRSS16",
        "name":"Ifrss16Duration",
        "type":"text",
    },
    {
        "label":"Annual Rent",
        "name":"AnnualRent",
        "type":"text",
    },
    {
        "label":"Payement Frequency",
        "name":"PayementFrequency",
        "type":"text",
    },
    {
        "label":"Discount Rate",
        "name":"DiscountRate",
        "type":"text",
    },
]
const set2=[
    {
        "label":"Months number",
        "name":"MonthsNumber",
        "type":"text",
    },
   
    {
        "label":"Annual Increase",
        "name":"AnnualIncrease",
        "type":"text",
    },
    {
        "label":"Increase Frequency",
        "name":"IncreaseFrequency",
        "type":"text",
    },
    {
        "label":"Increase Date",
        "name":"IncreaseDate",
        "type":"text",
    },
    {
        "label":"Prepaid Expenses Period Covered",
        "name":"PreExpensesPeriod",
        "type":"text",
    },
]
const set3=[
    {
        "label":"Prepaid Expenses Payment Date",
        "name":"PreExpensesPaymentDate",
        "type":"date",
    },
    {
        "label":"Date excute Update",
        "name":"DateExcuteUpdate",
        "type":"date",
    },
    {
        "label":"Date Reference",
        "name":"DateRef",
        "type":"date",
    },
    {
        "label":"increase Date",
        "name":"increaseDate",
        "type":"date",
    }
]
const handleField = (e) => {
    e.preventDefault();
    const fieldname = e.target.getAttribute('name');
    const fieldval= e.target.value;
    const newuser_data={...contract};
    newuser_data[fieldname] = fieldval;
    setContract(newuser_data);
    console.log(newuser_data)
};
const create = async ()=>{
    setPending(true)
    await axios.post('http://localhost:3006/contracts',contract) // bech tetbadel ki norbet bel backend
    .then((res)=> {
        setPending(false)
        //setContract()
        getdata()
        document.getElementById("form").reset();
    })
    .catch((err)=>console.log(err))
}
const updateData=async()=>{
    console.log(contract)
    setPending(true)
    await axios.put(`http://localhost:3006/contracts/${contract.id}`,contract)
    .then((resp)=>
        {console.log(resp) 
            getdata()
            setPending(false)
            setState(false)})
    .catch((err)=>console.log(err))
}
const submitForm  = (e)=>{
    e.preventDefault()
    update?
    updateData():
    create()

}
  return (
    <div> 
        {pending&& <Pending/> }
        <form id="form" className='creatcontract' onSubmit={submitForm}>  
        <div className='formcontainer'>
            <div className='set1'>
        {set1.map((input,key)=>{
                       
                       return( 
                           <Input 
                           key={key}
                               setContract={setContract}
                               contract={contract}
                               labelLeft={input.label}
                               name={input.name}
                               defaultValue={contract[input.name]}
                               type={input.type}
                               disabled={view ?true:false}
                               handleField={handleField}
                               //onChange={handleField}
                               />
                               )
                            })}
                            </div>
                            <div className='set2'>
                   {set2.map((input,key)=>{
                       
                       return( 
                           <Input 
                           key={key}
                               setContract={setContract}
                               contract={contract}
                               labelLeft={input.label}
                               name={input.name}
                               defaultValue={contract[input.name]}
                               type={input.type}
                               disabled={view ?true:false}
                               handleField={handleField}
                               //onChange={handleField}
                               />
                               )
                            })}
                            </div>
                            <div  className='set3'>
                            <div className="datediv">
        <Input handleField={handleField}
            contract={contract}
            labelLeft="Start Date"
            name="StartDate"
            defaultValue={contract.StartDate} 
            disabled={view ?true:false}
            type="date"
        />
        <FontAwesomeIcon icon={faArrowRightLong}/>
        <Input handleField={handleField}
            contract={contract}
            labelLeft="End Date"
            name="EndDate"
            defaultValue={contract.EndDate} 
            disabled={view ?true:false}
            type="date"
        />
        </div>
                   {set3.map((input,key)=>{
                       
                       return( 
                           <Input 
                           key={key}
                               setContract={setContract}
                               contract={contract}
                               labelLeft={input.label}
                               name={input.name}
                               defaultValue={contract[input.name]}
                               type={input.type}
                               disabled={view ?true:false}
                               handleField={handleField}
                               //onChange={handleField}
                               />
                               )
                            })}
                            </div>

                           


        </div>
        { !view? <Input type="submit" className="submitlabel"/>
                   : <button className="Quit" onClick={( )=>setState(false)}> Quite</button>}
    </form>
    </div>
  )
}

export default CreateContract


/* 


 <div className="set1">
        <Input 
            setContract={setContract}
            contract={contract}
            labelLeft="Contract Ref"
            name="ContractRef"
            defaultValue={contract.ContractRef}
            type="text"
            handleField={handleField}
            disabled={view ?true:false}
            
        />
        <Input 
        handleField={handleField}
        contract={contract}
            labelLeft="Duration Retained Under IFRSS16"
            name="Ifrss16Duration"
            defaultValue={contract.Ifrss16Duration}
            type="text"
            disabled={view ?true:false}
        />
        <Input 
handleField={handleField}
contract={contract}
            labelLeft="Annual Rent"
            name="AnnualRent"
            defaultValue={contract.AnnualRent} 
            type="text"
            disabled={view ?true:false}

        />
        <Input 
handleField={handleField}
contract={contract}
            labelLeft="Payement Frequency"
            name="PayementFrequency"
            defaultValue={contract.PayementFrequency} 
            type="text"
            disabled={view ?true:false}
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="Discount Rate"
            name="DiscountRate"
            defaultValue={contract.DiscountRate} 
            disabled={view ?true:false}
            type="text"
        />
        </div>




        <div className="set2">
        <Input 
handleField={handleField}
contract={contract}
            labelLeft="Months number"
            name="MonthsNumber"
            defaultValue={contract.MonthsNumber}
            type="text"
            disabled={view ?true:false}
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="Annual Increase"
            name="AnnualIncrease"
            defaultValue={contract.AnnualIncrease}
            disabled={view ?true:false}
            type="text"
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="Increase Frequency"
            name="IncreaseFrequency"
            defaultValue={contract.IncreaseFrequency} 
            disabled={view ?true:false}
            type="text"
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="Increase Date"
            name="IncreaseDate"
            defaultValue={contract.IncreaseDate} 
            disabled={view ?true:false}
            type="text"
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="Prepaid Expenses Period Covered"
            name="PreExpensesPeriod"
            defaultValue={contract.PreExpensesPeriod} 
            disabled={view ?true:false}
            type="text"
        />
        </div>







        <div className="set3">
            

        <Input handleField={handleField}
            contract={contract}
            labelLeft="Prepaid Expenses Payment Date"
            name="PreExpensesPaymentDate"
            defaultValue={contract.PreExpensesPaymentDate} 
            disabled={view ?true:false}
            type="date"
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="Date excute Update"
            name="DateExcuteUpdate"
            defaultValue={contract.DateExcuteUpdate} 
            type="date"
            disabled={view ?true:false}
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="DAte Reference"
            name="DateRef"
            defaultValue={contract.DateRef} 
            disabled={view ?true:false}
            type="date"
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="increase Date"
            name="increaseDate"
            defaultValue={contract.increaseDate} 
            disabled={view ?true:false}
            type="date"
        />
        </div>


*/