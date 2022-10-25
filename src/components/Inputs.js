import React from 'react';
import {validateInp} from "../commons/basics";

function NumberInput({value,handleChange,className,index,id,validateNo}) {
    const handleInput = (event)=>{
        let value = event.target.value
        if(value === ''){
            handleChange(null)
            return
        }
        value =  parseInt(value)
        if(!isNaN(value)){
            if (index !==undefined){
                handleChange(index,value,true)
            }else {
                handleChange(value)
            }
        }else {
            if (index !==undefined){
                handleChange(index,0,true)
            }else {
                handleChange('')
            }
        }
    }
    const handleValidate = (event) =>{
        let id = event.target.id
        if(validateNo){validateInp(id)}
    }
    return (
        <React.Fragment>
            <input className={className}
                   value={value}
                   onChange={handleInput}
                   onBlur={handleValidate}
                   id={id}
            />
        </React.Fragment>
    );
}
function EmailInput({value,handleChange,className}) {
    return (
        <React.Fragment>
            <input type="text" className={className}
                   value={value}
                   onChange={(event)=>{handleChange(event.target.value)}}

            />
        </React.Fragment>
    );
}

export {
    NumberInput,EmailInput
}
