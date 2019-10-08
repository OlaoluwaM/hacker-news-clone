import React from 'react';
import PostTitle from './Title';
import PostMetaInfo from './PostMetaInfo';
import { fetchPost, fetchComments } from '../utils/api';
import Loading from './Loading';
import queryString from 'query-string';

function CommentBody({ by, time, children }) {
  return (
    <div className='comment'>
      <PostMetaInfo by={by} time={time} />
      {children}
    </div>
  );
}

export default class Comment extends React.Component {
  state = {
    post: null,
    comments: null,
    error: null
  };

  componentDidMount() {
    const { location } = this.props;
    const { id: postID } = queryString.parse(location.search);
    (async () => {
      try {
        let post = await fetchPost(postID);
        this.setState({ post });
      } catch (error) {
        console.warn(error);
        this.setState({ error: 'Could not get post' });
      }
      try {
        let comments = await fetchComments(this.state.post);
        this.setState({ comments });
      } catch (error) {
        console.warn(error);
        this.setState({
          error: 'Could not get comments for this post'
        });
      }
    })();
  }
  isLoading = (dataType) => {
    const { error } = this.state;
    return this.state[dataType] === null && error === null;
  };
  render() {
    const { post, comments, error } = this.state;
    return (
      <React.Fragment>
        {this.isLoading('post') && <Loading message='Fetching Post' />}

        {!this.isLoading('post') && !error && (
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

        {error && <p className='error center-text'>{error}</p>}

        {!this.isLoading('post') && this.isLoading('comments') && (
          <Loading message='Fetching Comments' />
        )}

        {!this.isLoading('comments') && !error && comments.length <= 0 && (
          <p className='center-text'>This post has no comments</p>
        )}

        {!this.isLoading('comments') &&
          !error &&
          comments.length > 0 &&
          comments.map(({ id, by, time, text }) => (
            <CommentBody key={id} by={by} time={time} text={text}>
              <p dangerouslySetInnerHTML={{ __html: text }}></p>
            </CommentBody>
          ))}
      </React.Fragment>
    );
  }
}
