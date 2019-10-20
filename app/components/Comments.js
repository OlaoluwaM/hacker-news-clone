import React from 'react';
import PropTypes from 'prop-types';
import PostTitle from './Title';
import PostMetaInfo from './PostMetaInfo';
import { fetchPost, fetchComments } from '../utils/api';
import Loading from './Loading';
import useStartingData from '../reducers/DataReducer';
import queryString from 'query-string';

function CommentBody({ by, time, children }) {
  return (
    <div className='comment'>
      <PostMetaInfo by={by} time={time} />
      {children}
    </div>
  );
}

function SelectedPost({ postID, children }) {
  const { state, dispatch, isLoading } = useStartingData();

  const { data, error } = state;

  React.useEffect(() => {
    (async () => {
      try {
        let post = await fetchPost(postID);
        dispatch({ type: 'Success', data: post });
      } catch (error) {
        console.warn(error);
        dispatch({ type: 'Error', error: 'Could not get this post' });
      }
    })();
  }, []);

  return (
    <React.Fragment>
      {error && <p className='error center-text'>{error}</p>}

      {isLoading() && <Loading message='Fetching Post' />}

      {!isLoading() && !error && (
        <React.Fragment>
          <h1 className='header'>
            <PostTitle url={data.url} title={data.title} />
          </h1>
          <PostMetaInfo
            id={data.id}
            by={data.by}
            time={data.time}
            descendants={data.descendants}
          />
        </React.Fragment>
      )}

      {!isLoading() && !error && children(data)}
    </React.Fragment>
  );
}

function CommentList({ post }) {
  const { state, dispatch, isLoading } = useStartingData();

  const { data, error } = state;

  React.useEffect(() => {
    (async () => {
      try {
        let comments = await fetchComments(post);
        dispatch({ type: 'Success', data: comments });
      } catch (error) {
        console.warn(error);
        dispatch({
          type: 'Error',
          error: 'Could not get comments for this post'
        });
      }
    })();
  }, []);

  return (
    <React.Fragment>
      {error && <p className='error center-text'>{error}</p>}

      {isLoading() && <Loading message='Fetching Comments' />}

      {!isLoading() && !error && data.length <= 0 && (
        <p className='center-text'>This post has no comments</p>
      )}

      {!isLoading() &&
        !error &&
        data.length > 0 &&
        data.map(({ id, by, time, text }) => (
          <CommentBody key={id} by={by} time={time} text={text}>
            <p dangerouslySetInnerHTML={{ __html: text }}></p>
          </CommentBody>
        ))}
    </React.Fragment>
  );
}

export default function Comment(props) {
  const { id: postID } = queryString.parse(props.location.search);
  return (
    <SelectedPost postID={Number(postID)}>
      {(postData) => <CommentList post={postData} />}
    </SelectedPost>
  );
}

CommentBody.propTypes = {
  by: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired
};
CommentList.propTypes = {
  post: PropTypes.object.isRequired
};
SelectedPost.propTypes = {
  postID: PropTypes.number.isRequired
};
