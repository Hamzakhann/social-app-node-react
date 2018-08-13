import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profileAction';
import Spinner from '../common/spinner';
import {Link} from 'react-router-dom';
class Dashboard extends Component {

  componentDidMount(){
    this.props.getCurrentProfile()
  }
  render() {

    const {user} = this.props.auth;
    const {profile , loading} = this.props.profile;
    let dashboardContent;
    if(profile === null || loading){
      dashboardContent = <Spinner/>
    }else{
      //check if logged in user has profile data
      if(Object.keys(profile).length  > 0){
        dashboardContent = <h4>TODO : display PROFILE</h4>
      }else{
        //user is logged in but no profile
        dashboardContent =(
          <div>
            <p>
              helloo {user.name}
            </p>
            <Link to = '/create-profile' className = 'btn btn-lg btn-info' >
            Create profile
            </Link>
          </div>
        )
      }
    }
    return (
      <div className = 'dashboard' >
            <div className = 'conatiner' >
            <div className = 'row' >
            <div className = 'col-md-12' >
            <h1 className = 'display-4' >Dashboard </h1>
            {dashboardContent}
            </div>
            </div>
            </div> 
      </div>  
    
    )
  }
};


const mapStateToProps = (state) =>({
  profile : state.profile,
  auth : state.auth
})

export default connect(mapStateToProps , {getCurrentProfile})(Dashboard);