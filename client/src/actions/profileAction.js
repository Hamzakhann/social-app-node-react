import axios from 'axios';
import {GET_PROFILE , GET_ERRORS , PROFILE_LOADING , CLEAR_CURRENT_PROFILE} from './types';

// GET current profile

export const getCurrentProfile = () => dispatch =>{
  dispatch(setProfileLoading());
  axios.get('/api/profile')
  .then(res =>{
    dispatch({
      type : GET_PROFILE,
      payload : res.data
    })
  }).catch(err =>
    dispatch({
      type : GET_PROFILE,
      payload : {}
    })
  )
};

//Loading profile
export const  setProfileLoading = ()=>{
  return {
    type : PROFILE_LOADING
  }
}

//clear current profile
export const  clearCurrentProfile = ()=>{
  return {
    type : CLEAR_CURRENT_PROFILE
  }
}


//Create profile
export const createProfile = (profileData , history) => dispatch =>{
  axios
  .post('/api/profile' , profileData)
  .then(res => history.push('/dashboard'))
  .catch(err =>
  dispatch({
    type : GET_ERRORS,
    payload : err.response.data
  })
  )
};