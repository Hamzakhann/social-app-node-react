import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGitHub from './ProfileGitHub';
import Spinner from '../common/spinner';
import {getProfileByHandle} from '../../actions/profileAction'
class Profile extends Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.profile.profile === null && this.props.profile.loading){
      this.props.history.push('/not-found')
    }
  }
  componentDidMount(){
    if(this.props.match.params.handle){
      this.props.getProfileByHandle(this.props.match.params.handle)
    }
  }
  render() {
    const {profile , loading} = this.props.profile;
    let profileContent;
    if(profile === null || loading){
      profileContent = <Spinner/>
    }else{
      profileContent = (
        <div>
          <div className = "row" > 
          <div className = "col-md-6" >
          <Link to = "/profiles" className = "btn btn-light mb-3 float-left" >
          Back To Profile
          </Link>
          </div>
          <div className = "col-md-6" />
          </div>
          <ProfileHeader profile = {profile} />
          <ProfileAbout  profile = {profile}/>
          <ProfileCreds education = {profile.education} experience ={profile.experience}/>
          {profile.githubusername ? <ProfileGitHub userName = {profile.githubusername}/> : null }
        </div>
      )
    }
    return (
    
      <div className = "profile">
      <div className = "container">
      <div className = "row" >
      <div className = "col-md-12" >
      {profileContent}
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

export default connect(mapStateToProps , {getProfileByHandle})(Profile);
