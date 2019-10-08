import React from 'react';
import PropTypes from 'prop-types';

export default function PostTitle({ url, title }) {
  return (
    <a href={url} className='link'>
      {title}
    </a>
  );
}

PostTitle.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
