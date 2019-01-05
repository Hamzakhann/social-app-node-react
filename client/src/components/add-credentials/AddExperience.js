import React, { Component } from 'react';
import {Link , withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/textFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addExperience} from '../../actions/profileAction'
import {connect} from 'react-redux';

class AddExperience extends Component {
  constructor(props){
    super(props);
    this.state = {
      company : '',
      title : '',
      location : '',
      from : '',
      to : '',
      current : false,
      description : '',
      errors : {},
      disabled : false
    }
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.errors) {
      this.setState({errors : nextProps.errors})
    }
  }

  onSubmit = (e) =>{
    e.preventDefault()
    const expData = {
      company : this.state.company,
      title : this.state.title,
      location : this.state.location,
      from : this.state.from,
      to : this.state.to,
      current : this.state.current,
      description : this.state.description,
    }
    this.props.addExperience(expData, this.props.history)
  }
  onChange = (e) =>{
    this.setState({[e.target.name] : e.target.value})
  }
  onCheck = () =>{
    this.setState({
      disabled : !this.state.disabled,
      current : !this.state.current
    })
  }
  render() {
    return (
      <div className = "add-experience" >
      <div className = "container" >
      <div className = "row" >
      <div className = "col-md-8 m-auto" >
      <Link to = "/dashboard" className = "btn btn-light" >Go Back</Link>
      <h1 className = "display-4 text-center" >
      Add Experience
      </h1>
      <p className = "lead-text-center" >
      Add any job or positionthat you have had in past or current
      </p>
      <form onSubmit = {this.onSubmit} >
      <TextFieldGroup 
      placeholder = "* Company"
      name = "company"
      value = {this.state.company}
      onChange = {this.onChange}
      />
       <TextFieldGroup 
      placeholder = "* Job Title"
      name = "title"
      value = {this.state.title}
      onChange = {this.onChange}
      />
     <TextFieldGroup 
      placeholder = "* Location"
      name = "location"
      value = {this.state.location}
      onChange = {this.onChange}
      />
      <h6>From Date</h6>
      <TextFieldGroup 
      name = "from"
      type = "date"
      value = {this.state.from}
      onChange = {this.onChange}
      />
    <h6>To Date</h6>
      <TextFieldGroup 
      name = "to"
      type = "date"
      value = {this.state.to}
      onChange = {this.onChange}
      disabled = {this.state.disabled ? 'disabled' : ''}
      />
      <div className = "form-check mb-4" >
      <input 
      type = "checkbox"
      className = "form-check-input"
      name = "current"
      value = {this.state.current}
      checked = {this.state.current}
      onChange = {this.onCheck}
      id = "current"
      />
      <label htmlFor = "current" className = "form-check-label" >current job</label>
      </div>
      <TextAreaFieldGroup 
      placeholder = "Job Description"
      name = "description"
      value = {this.state.description}
      onChange = {this.onChange}
      info = "tell us about a position"
      />
      <input 
      type = "submit"
      value = "submit"
      className = "btn btn-info btn-block mt-4"
      />
      </form>
      </div>

      </div>
      </div>

      </div>
    )
  }
}
const mapStateToProps = (state) =>({
  profile : state.profile,
  errors : state.errors
})
export default connect(mapStateToProps , {addExperience})(withRouter(AddExperience));