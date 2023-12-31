import React, { useEffect } from "react"

function InputWithLabel(props) {
    const inputRef = React.useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
    <>
        <label htmlFor={props.id}>{props.children}</label> 
        <input 
            ref={inputRef}
            type={props.type} 
            id={props.id} 
            name={props.name}
            value={props.value} 
            onChange={props.onChange}
        />
    </>
   )
}
   
export default InputWithLabel