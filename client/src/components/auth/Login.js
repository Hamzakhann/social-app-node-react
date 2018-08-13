import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loginUser} from '../../actions/authAction';
import TextFieldGroup from '../common/textFieldGroup';
class Login extends Component {
  constructor(){
    super();
    this.state = {
      email : '',
      password : '',
      errors : {}
    }
  }
  
  onChange = (e)=>{
    this.setState({[e.target.name] : e.target.value})
  }
  onSubmit = (e)=> {
    e.preventDefault()
    const userData = {
      email : this.state.email,
      password : this.state.password
    }
    this.props.loginUser(userData)
  };

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    };

    if(nextProps.errors){
      this.setState({errors : nextProps.errors})
    }
  }


  render() {
    const {errors} = this.state
    return (
      // <!-- Login -->
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit = {this.onSubmit} >
              <TextFieldGroup 
              placeholder = 'email address'
              name = 'email'
              type = 'email'
              value = {this.state.email}
              onChange = {this.onChange}
              />
              <TextFieldGroup 
              placeholder = 'Password'
              name = 'password'
              type = 'password'
              value = {this.state.password}
              onChange = {this.onChange}
              />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

// Login.PropTypes = {
//   loginUser : PropTypes.func.isRequired,
//   auth : PropTypes.Object.isRequired,
//   errors : PropTypes.Object.isRequired
// }

const mapStateToProps = (state) =>({
  auth : state.auth,
  errors : state.errors
})

export default connect(mapStateToProps , {loginUser})(Login);
