import React, { useEffect } from "react"
import style from './AddTodoForm.module.css';
import PropTypes from 'prop-types';

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
            className={style.Input}
        />
    </>
   )
}

InputWithLabel.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}
   
export default InputWithLabel