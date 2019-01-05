import React, { Component } from 'react';
import {connect} from 'react-redux';
import {deleteExperience} from '../../actions/profileAction';
import Moment from 'react-moment';
class Experience extends Component {


  onDeleteClick = (id) =>{
    this.props.deleteExperience(id)
  }
  render() {
    const experience = this.props.experience.map(exp =>(
      <tr key = {exp._id} >
      <td>{exp.comapny}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format = "YYYY/MM/DD" >{exp.from}</Moment> - {' '}
        {exp.to === null ?(' Now') : (<Moment format = "YYYY/MM/DD" >{exp.TO}</Moment>)}
      </td>
      <td><button onClick = {this.onDeleteClick} className = "btn btn-danger" >Delete</button></td>
      </tr>
    ))
    return (
      <div>
        <h4 className = "mb-4" >Experience Credentials</h4>
        <table className= "table" > 
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th></th>
          </tr>
          {experience}
        </thead>
        </table>
      </div>
    )
  }
}


export default connect(null , {deleteExperience})(Experience);
 