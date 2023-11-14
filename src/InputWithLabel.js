import React from "react"

function InputWithLabel(props) {
   return (
    <>
        <label htmlFor={props.id}>{props.children}</label> 
        <input 
            type={props.type} 
            id={props.id} 
            name={props.name}
            value={props.value} 
            onChange={props.onChange}>
        </input>
    </>
   )
}
   
    

export default InputWithLabel