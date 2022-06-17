import React, { Fragment } from "react";
import "./Selectinput.css";

const SelectInput = (props) => {
    const { name,label, onChange, className, options,handleField } = props;
    
    return (
        <label className={className}>
            {label}
            <select
                name={name}
                defaultValue={props.value}
                onChange={handleField}
                className={`select-input ${props.value === 0? "pending":props.value===1?"activee":props.value===-1?"inactive":""}`}
                disabled={props.disabled}
            >
                <option value="" defaultValue="">none</option>
                {options.map((option) => (
                    <option key={option.label} value={option.value} >
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default SelectInput;