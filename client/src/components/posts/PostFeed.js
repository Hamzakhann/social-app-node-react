import React, { Component } from 'react'
import PostItem from './PostItem';


class PostFeed extends Component {
  render() {
    const {posts} = this.props
    console.log('ye hai meri posts' ,posts)
     return posts.map((post) => <PostItem post = {post} />)
  }
}

export default PostFeed
