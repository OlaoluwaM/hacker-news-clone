import React from 'react';
import PropTypes from 'prop-types';
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

CommentBody.propTypes = {
  by: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired
};

class SelectedPost extends React.Component {
  static propTypes = {
    postID: PropTypes.number.isRequired
  };

  state = {
    post: null,
    error: null
  };

  componentDidMount() {
    const { postID } = this.props;
    (async () => {
      try {
        let post = await fetchPost(postID);
        this.setState({ post });
      } catch (error) {
        this.setState({ error: 'Could not get post' });
        throw new Error(error);
      }
    })();
  }

  isLoading(dataType) {
    const { error } = this.state;
    return this.state[dataType] === null && error === null;
  }

  render() {
    const { post, error } = this.state;
    const { children } = this.props;
    return (
      <React.Fragment>
        {error && <p className='error center-text'>{error}</p>}

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

        {!this.isLoading('post') && !error && children(post, this.isLoading)}
      </React.Fragment>
    );
  }
}

class CommentList extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    isLoading: PropTypes.func.isRequired
  };
  state = {
    comments: null,
    error: null
  };

  componentDidMount() {
    const { post } = this.props;
    (async () => {
      try {
        let comments = await fetchComments(post);
        this.setState({ comments });
      } catch (error) {
        this.setState({ error: 'Could not fetch comments for this post' });
        throw new Error(error);
      }
    })();
  }

  render() {
    const { isLoading } = this.props;
    const { comments, error } = this.state;
    let loadingData = isLoading.bind(this);
    return (
      <React.Fragment>
        {error && <p className='error center-text'>{error}</p>}

        {loadingData('comments') && <Loading message='Fetching Comments' />}

        {!loadingData('comments') && !error && comments.length <= 0 && (
          <p className='center-text'>This post has no comments</p>
        )}

        {!loadingData('comments') &&
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

export default function Comment(props) {
  const { id: postID } = queryString.parse(props.location.search);
  return (
    <SelectedPost postID={Number(postID)}>
      {(postData, loading) => (
        <CommentList post={postData} isLoading={loading} />
      )}
    </SelectedPost>
  );
}
