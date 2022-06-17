import React, { Fragment } from "react";
import "./input.css";

const Input = (props) => {
    const { disabled,setContract,login,onChange,labelLeft,handleField, labelRight, className, type,children,contract } = props;
    const label = labelLeft || labelRight;
   
    const handlefield = (e) => {
        onChange(e.target.value);
       };
    return (
        <Fragment>
            {label ? (
                <label className={className}>
                   {labelLeft}
                    <input
                        type={props.type}
                        name={props.name}
                        defaultValue={props.defaultValue}
                        onChange={login?handlefield:handleField}
                        className="text-input"
                        disabled={disabled}
                    />
                     
                    
                </label>
            ) : (
                <label className={className}>
                    <input
                        type={props.type}
                        name={props.name}
                        defaultValue={props.defaultValue}
                        onChange={handleField}
                        className="text-input"
                    />
                    {labelRight}
                </label>
            )}
        </Fragment>
    );
};

export default Input;/* import './input.css'
const Input = (props)=>{
const {label,type,placeholder,onChange,children,name,defaultValue}=props
const handleField = (e) => {
 onChange(e.target.value);
};
console.log(defaultValue)
return(
    <div className="aa" >
        <label className="label">
            {label}
        </label>
        <input
            id={name}
            type={type}
            name={name}
            onChange={handleField}
            placeholder={placeholder}
            className="text-input"
            defaultValue={defaultValue}
        />
        {children}
        
    </div>
)
}
export default Input */
