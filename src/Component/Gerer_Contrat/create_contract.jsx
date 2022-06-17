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
    setContract,contract,getdata
    }=props

const [data,setData]=useState()

const [pending,setPending ] = useState(false)

const handleField = (e) => {
    e.preventDefault();
    const fieldname = e.target.getAttribute('name');
    const fieldval= e.target.value;
    const newuser_data={...contract};
    newuser_data[fieldname] = fieldval;
    setContract(newuser_data);
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
const submitForm  = (e)=>{
    e.preventDefault()
    create()

}
  return (
    <div> 
        {pending&& <Pending/> }
        <form id="form" className='creatcontract' onSubmit={submitForm}>  
        <div className='formcontainer'>
            <div className="set1">
        <Input 
            setContract={setContract}
            contract={contract}
            labelLeft="Contract Ref"
            name="ContractRef"
            defaultValue={contract.ContractRef}
            type="text"
            handleField={handleField}
            //onChange={handleField}
            
        />
        <Input 
        handleField={handleField}
        contract={contract}
            labelLeft="Duration Retained Under IFRSS16"
            name="Ifrss16Duration"
            defaultValue={contract.Ifrss16Duration}
            type="text"
            //onChange={handleField}
        />
        <Input 
handleField={handleField}
contract={contract}
            labelLeft="Annual Rent"
            name="AnnualRent"
            defaultValue={contract.AnnualRent} 
            type="text"
            //onChange={handleField}

        />
        <Input 
handleField={handleField}
contract={contract}
            labelLeft="Payement Frequency"
            name="PayementFrequency"
            defaultValue={contract.PayementFrequency} 
            type="text"
            //onChange={handleField}
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="Discount Rate"
            name="DiscountRate"
            defaultValue={contract.DiscountRate} 
            //onChange={handleField}
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
            //onChange={handleField}
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="Annual Increase"
            name="AnnualIncrease"
            defaultValue={contract.AnnualIncrease}
            //onChange={handleField}
            type="text"
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="Increase Frequency"
            name="IncreaseFrequency"
            defaultValue={contract.IncreaseFrequency} 
            //onChange={handleField}
            type="text"
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="Increase Date"
            name="IncreaseDate"
            defaultValue={contract.IncreaseDate} 
            //onChange={handleField}
            type="text"
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="Prepaid Expenses Period Covered"
            name="PreExpensesPeriod"
            defaultValue={contract.PreExpensesPeriod} 
            //onChange={handleField}
            type="text"
        />
        </div>
        <div className="set3">
            <div className="datediv">
        <Input handleField={handleField}
            contract={contract}
            labelLeft="Start Date"
            name="StartDate"
            defaultValue={contract.StartDate} 
            //onChange={handleField}
            type="date"
        />
        <FontAwesomeIcon icon={faArrowRightLong}/>
        <Input handleField={handleField}
            contract={contract}
            labelLeft="End Date"
            name="EndDate"
            defaultValue={contract.EndDate} 
            //onChange={handleField}
            type="date"
        />
        </div>

        <Input handleField={handleField}
            contract={contract}
            labelLeft="Prepaid Expenses Payment Date"
            name="PreExpensesPaymentDate"
            defaultValue={contract.PreExpensesPaymentDate} 
            //onChange={handleField}
            type="date"
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="Date excute Update"
            name="DateExcuteUpdate"
            defaultValue={contract.DateExcuteUpdate} 
            type="date"
            //onChange={handleField}
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="DAte Reference"
            name="DateRef"
            defaultValue={contract.DateRef} 
            //onChange={handleField}
            type="date"
        />
        <Input handleField={handleField}
            contract={contract}
            labelLeft="increase Date"
            name="increaseDate"
            defaultValue={contract.increaseDate} 
            //onChange={handleField}
            type="date"
        />
        </div>
        </div>
    <Input 
            type="submit"
            value="submit"
        />
    </form>
    </div>
  )
}

export default CreateContract