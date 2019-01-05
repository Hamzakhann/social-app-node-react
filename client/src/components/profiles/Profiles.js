import React, { Component } from 'react';
import {connect} from 'react-redux';
import Spinner from '../common/spinner';
import ProfileItem from './ProfileItem';
import {getProfiles} from '../../actions/profileAction';
class Profiles extends Component {

  componentDidMount(){
    this.props.getProfiles()
  }

  render() {
    const {profiles , loading} = this.props.profile
    let profileItem;
    if(profiles === null || loading){
      profileItem = <Spinner />;
    }else{
      if(profiles.length > 0){
        profileItem = profiles.map(profile =>(
          <ProfileItem key = {profile._id} profile = {profile} />
        ))
      }else {
        profileItem = <h4>No Profile found....</h4>
      }
    }
    return (
      <div className = "profiles" >
      <div className = "container" >
      <div className = "row" >
      <div className = "col-md-12" >
      <h1 className = "display-4 text-center" >Developers Profile</h1>
      <p className = "lead text-center" >
      Browse and connect with developers
      </p>
      {profileItem}
      </div>

      </div>

      </div>
        
      </div>
    )
  }
}

 const mapStateToProps = state => ({
   profile : state.profile
 })

export default connect(mapStateToProps , {getProfiles})(Profiles)