import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class ProfileGitHub extends Component {
  constructor(props){
    super(props)
    this.state = {
      clientId : '11687ed14f912e05249e ',
      clientSecret : "9da21a07ce2ef2ec9000349c892a74384dcd41a7",
      count : 5,
      sort : 'created: asc',
      repos : []
    }
  }

  componentDidMount(){
    const {userName} = this.props;
    const {count , sort , clientId , clientSecret} = this.state;
    axios.get(`http://api.github.com/users/${userName}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
    .then(data =>{
      this.setState({repos : data})
      console.log(data)
    }).catch(err => console.log(err))
  }
  render() {
    console.log(this.props)
    const {repos} = this.state;
    const repoItems = repos.map(repo =>(
      <div key = {repo.id} className ="card card-body mb-2">
      <div className = "row">
      <div className ="col-md-6" >
      <h4>
        <Link to = {repo.html_url} className = "text-info" target = "_blank">
        {repo.name}
        </Link>
      </h4>
      <p> {repo.description} </p>
      </div>
      <div className = "col-md-6" >
      <span className= "badge badge-info mr-1" >
      Stars : {repo.stargazers_count }
      </span>
      <span className= "badge badge-secondary mr-1" >
      Watchers : {repo.watchers_count }
      </span>
      <span className= "badge badge-success mr-1" >
      Forks : {repo.forks_count }
      </span>
      </div>
      </div>
      </div>
    ))
    return (
      <div>
        <hr/>
        <h3 className = "mb-4" >Latest github Repos</h3>
        {repoItems}
      </div>
    )
  }
}

export default  ProfileGitHub;
