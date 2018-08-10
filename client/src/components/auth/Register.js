import React, { Component } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authAction';
class Register extends Component {
  constructor(){
    super();

    this.state = {
      name : '',
      email : '',
      password : '',
      password2 : '',
      errors : {}
    }
  };

  onChange = (e)=>{
    this.setState({[e.target.name] : e.target.value})
  }
  onSubmit = (e)=> {
    e.preventDefault()
    const newUser = {
      name: this.state.name,
      email : this.state.email,
      password : this.state.password,
      password2 : this.state.password2
    }
    this.props.registerUser(newUser)
    // axios.post('/api/users/register' , newUser)
    // .then(res => console.log(res.data))
    // .catch(err => this.setState({errors : err.response.data}));
  }


  render() {
    const {errors} = this.state;
    const {user} = this.props.auth
    return (
      // <!-- Register -->
      <div className="register">
      {user ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit = {this.onSubmit} >
                <div className="form-group">
                  <input type="text" 
                  placeholder="Name" 
                  className="form-control form-control-lg"
                  name="name" 
                  value = {this.state.name}
                  onChange = {this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input type="email" 
                  className="form-control form-control-lg" 
                  placeholder="Email Address" 
                  name="email" 
                  value = {this.state.email} 
                  onChange = {this.onChange}
                  />
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input type="password" 
                  className="form-control form-control-lg" 
                  placeholder="Password" 
                  name="password" 
                  value = {this.state.password} 
                  onChange = {this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input type="password" 
                  className="form-control form-control-lg" 
                  placeholder="Confirm Password" 
                  name="password2" 
                  value = {this.state.password2} 
                  onChange = {this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    
    )
  }
};

Register.PropTypes = {
  registerUser :  PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
  auth : state.auth
})

export default connect(null , {registerUser})(Register);
