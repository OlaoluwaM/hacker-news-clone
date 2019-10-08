import React from 'react';
import PropTypes from 'prop-types';
import PostTitle from './Title';
import PostMetaInfo from './PostMetaInfo';

export default function PostList({ id, by, time, url, title, descendants }) {
  return (
    <li className='post'>
      <PostTitle url={url} title={title} />
      <PostMetaInfo id={id} by={by} time={time} descendants={descendants} />
    </li>
  );
}

PostList.propTypes = {
  id: PropTypes.number.isRequired,
  by: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  descendants: PropTypes.number.isRequired
};
