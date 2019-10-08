import React from 'react';
import PropTypes from 'prop-types';
import PostTitle from './PostTitle';
import PostMetaInfo from './PostMetaInfo';
import { fetchPost, onlyComments } from '../utils/api';
import Loading from './Loading';

export default class Comment extends React.Component {
  static propTypes = {
    postID: PropTypes.number.isRequired
  };
  state = {
    post: null,
    comments: null,
    error: null
  };
  componentDidMount() {
    const { postID } = this.props;
    (async () => {
      try {
        let post = await fetchPost(postID);
        this.setState({ post });
      } catch (error) {
        console.warn(error);
        this.setState({ error: 'Could not get post' });
      }
      try {
        let comments = await onlyComments(this.state.post);
        this.setState({ comments });
      } catch (error) {
        console.warn(error);
        this.setState({ error: 'Could not get comments for this post' });
      }
    })();
  }
  render() {
    const { post, comments, error } = this.state;
    return (
      <React.Fragment>
        <Loading data={post} errorState={error} message='Fetching Post' />
        {post && (
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

        {error && <p>{error}</p>}

        {post && (
          <Loading
            data={comments}
            errorState={error}
            message='Fetching comments'
          />
        )}
        
        {comments && comments.length <= 0 && <p>This post has no comments</p>}
        {comments && comments.length > 0 && (
          <pre>{JSON.stringify(comments, null, 2)}</pre>
        )}
      </React.Fragment>
    );
  }
}
