import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link ,withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/textFieldGroup';
import InputGroup from '../common/inputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import isEmpty from '../../validation/is-empty';
import {createProfile , getCurrentProfile} from '../../actions/profileAction';
import { PROFILE_LOADING } from '../../actions/types';
class EditProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      displaySocialInputs : false,
      handle : '',
      company : '',
      website : '',
      location : '',
      status : '',
      skills : '',
      githubusername : '',
      bio : '',
      twitter : '',
      facebook : '',
      linkedin : '',
      youtube : '',
      instagram : '',
      errors : {}
    }
  }

  onSocial = (e) =>{
    this.setState({displaySocialInputs : true})
  }
  onChange = (e) =>{
    this.setState({[e.target.name] : e.target.value})
  }
  onSubmit = (e) =>{
    e.preventDefault()
    const profileData = {
      handle : this.state.handle,
      company : this.state.company,
      website : this.state.website,
      location : this.state.location,
      status : this.state.status,
      skills : this.state.skills,
      githubusername : this.state.githubusername,
      bio : this.state.bio,
      twitter : this.state.twitter,
      facebook : this.state.facebook,
      linkedin : this.state.linkedin,
      youtube : this.state.youtube,
      instagram : this.state.instagram
    }
    this.props.createProfile(profileData , this.props.history)
    
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors : nextProps.errors})
    }
    if(nextProps.profile.profile){
      const profile = nextProps.profile.profile
      //bring skills array back to csv
      const skillsCSV = profile.skills.join(',');
      //If profileField doesnt exist make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

      //set component field state
      this.setState({
        handle : profile.handle,
        company : profile.company,
        website : profile.website,
        location : profile.location,
        status : profile.status,
        skills : skillsCSV,
        githubusername : profile.githubusername,
        bio : profile.bio,
        twitter :profile.twitter,
        facebook :profile.facebook,
        linkedin : profile.linkedin,
        youtube : profile.youtube,
        instagram : profile.instagram
      })
    }
  }
  componentDidMount(){
    this.props.getCurrentProfile()
  }
  render() { 
    const {displaySocialInputs} = this.state
    let socialInputs;

    if(displaySocialInputs){
      socialInputs = (
        <div>
          <InputGroup
          placeholder = "Twitter profile URL"
          name = "twitter"
          icon = "fab fa-twitter"
          value = {this.state.twitter}
          onChange = {this.onChange}
          />
       <InputGroup
          placeholder = "Facebook profile URL"
          name = "facebook"
          icon = "fab fa-facebook"
          value = {this.state.facebook}
          onChange = {this.onChange}
          />
         <InputGroup
          placeholder = "Linkedin profile URL"
          name = "linkedin"
          icon = "fav fa-linkedin"
          value = {this.state.linkedin}
          onChange = {this.onChange}
          />
         <InputGroup
          placeholder = "Youtube profile URL"
          name = "youtube"
          icon = "fav fa-youtube"
          value = {this.state.youtube}
          onChange = {this.onChange}
          />
       <InputGroup
          placeholder = "Instagaram profile URL"
          name = "instagram"
          icon = "fav fa-instagram"
          value = {this.state.instagram}
          onChange = {this.onChange}
          />
        </div>
      )
    }
    
    const options = [
      {lable : '* Select Professional status' , value : 0},
      {lable : 'Developer' , value : 'Developer'},
      {lable : 'Junior Developer' , value : 'Junior Developer'},
      {lable : 'Manager' , value : 'Manager'},
      {lable : 'Student or Learning' , value : 'Student or Learning'},
      {lable : 'Instructor or Teacher' , value : 'Instructor or Teacher'},
      {lable : 'Intern' , value : 'Intern'},
      {lable : 'Other' , value : 'Other'}
    ]
    return (
      <div className="create-profile" >
      <div className = "container" >
      <div className = "row" >
      <div className = "col-md-8  m-auto">
      <Link to = "/dashboard" className = "btn btn-light" >Go Back</Link>
      <h1 className = "display-4 text-center">Edit your profile</h1>
     
      <form onSubmit = {this.onSubmit} >
      <TextFieldGroup
      placeholder = 'Profile Holder'
      name = 'handle'
      value = {this.state.handle}
      onChange = {this.onChange}
      />
      <SelectListGroup
      placeholder = 'Status'
      name = 'status'
      value = {this.state.status}
      onChange = {this.onChange}
      options = {options}
      /> 
       <TextFieldGroup
      placeholder = 'Company'
      name = 'company'
      value = {this.state.company}
      onChange = {this.onChange}
      />
      <TextFieldGroup
      placeholder = 'Website'
      name = 'website'
      value = {this.state.website}
      onChange = {this.onChange}
      />
      <TextFieldGroup
      placeholder = 'Location'
      name = 'location'
      value = {this.state.location}
      onChange = {this.onChange}
      />
      <TextFieldGroup
      placeholder = 'skills'
      name = 'skills'
      value = {this.state.skills}
      onChange = {this.onChange}
      />
      <TextFieldGroup
      placeholder = 'githubusername'
      name = 'githubusername'
      value = {this.state.githubusername}
      onChange = {this.onChange}
      />
      <TextAreaFieldGroup
      placeholder = 'Shor Bio'
      name = 'bio'
      value = {this.state.bio}
      onChange = {this.onChange}
      />
      <div className = 'mb-3'>
      <button 
      type = 'button'
      onClick = {this.onSocial}
      className = 'btn btn-light' >
      Add social buttons
      </button>
      <span className = 'text-muted'>Optional</span>
      </div>
      {socialInputs}
      <input type = 'submit' value = 'submit' className = "btn btn-info btn block mt-4"/>
      </form>
      </div>
      </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>({
  profile : state.profile
})
export default connect(mapStateToProps , {createProfile , getCurrentProfile})(withRouter(EditProfile));