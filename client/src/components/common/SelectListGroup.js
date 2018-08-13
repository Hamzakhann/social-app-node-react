import React from 'react';

const SelectListGroup =  ({
  name,
  value,
  info,
  onChange,
  options,
}) => {
  const selectOptions = options.map(option => (
    <option key = {option.lable} value = {option.value} >
    {option.lable}
    </option>
  ))
  return (
    <div className="form-group">
    <select 
    className="form-control form-control-lg" 
  
    name={name}
    value = {value}
    onChange = {onChange}>
    {selectOptions}
    </select>
    {info && <small className="form-text text-muted">{info}</small> }
  </div>
  )
}


export default SelectListGroup;