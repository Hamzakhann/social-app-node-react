import React from 'react';

const TextFieldGroup =  ({
  name,
  placeholder,
  value,
  label,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
    <input type={type} 
    className="form-control form-control-lg" 
    placeholder={placeholder} 
    name={name}
    value = {value}
    onChange = {onChange}
    disabled = {disabled}
    />
    {info && <small className="form-text text-muted">{info}</small> }
  </div>
  )
}


export default TextFieldGroup;