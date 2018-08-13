import React from 'react';

const InputGroup =  ({
  name,
  placeholder,
  value,
  icon,
  type,
  onChange,
}) => {
  return (
    <div className="input-group mb-3">
    <div className = 'input-group-prepend' >
      <span className = "input-group-text" ></span>
      <i className = {icon} />
    </div>
    <input 
    className="form-control form-control-lg" 
    placeholder={placeholder} 
    name={name}
    value = {value}
    onChange = {onChange}
    />
  </div>
  )
}


export default InputGroup;