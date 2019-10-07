import React from 'react';
import PropTypes from 'prop-types';
import PostTitle from './PostTitle';
import PostMetaInfo from './PostMetaInfo';
import { fetchPost, onlyComments } from '../utils/api';

export default class Comment extends React.Component {
  static propTypes = {
    postID: PropTypes.number.isRequired
  };
  state = {
    post: null,
    comments: null,
    loading: true,
    error: null
  };
  componentDidMount() {
    const { postID } = this.props;
    fetchPost(postID)
      .then((post) => {
        onlyComments(post).then((comments) =>
          this.setState({
            post,
            comments,
            loading: false,
            error: null
          })
        );
      })
      .catch((err) => {
        console.warn(err);
        this.setState({
          error: 'Could not get comments for this post'
        });
      });
  }
  isLoading = () => {
    const { loading, error } = this.state;
    return error === null && loading === true;
  };
  render() {
    const { post, comments } = this.state;
    console.log(this.state.post, this.state.comments);
    return (
      <React.Fragment>
        {this.isLoading() && <p>Loading...</p>}
        {!this.isLoading() && (
          <React.Fragment>
            <h1 className='header'>
              <PostTitle url={post.url} title={post.title} />
            </h1>
            <PostMetaInfo
              id={post.id}
              by={post.by}
              time={post.time}
              descendants={post.descendants}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
