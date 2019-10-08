import React from 'react';
import PropTypes from 'prop-types';
import toFullDateString from '../utils/helper';

export default function PostMetaInfo({ id, by, time, descendants, getPostID }) {
  return (
    <div className='meta-info-light'>
      <span>
        by <a href='#'>{by}</a>
      </span>
      <span>on {toFullDateString(time)}</span>
      {descendants !== undefined && (
        <span>
          with{' '}
          <a href='#' onClick={() => getPostID(id)}>
            {descendants}
          </a>{' '}
          comments
        </span>
      )}
    </div>
  );
}

PostMetaInfo.propTypes = {
  by: PropTypes.string,
  time: PropTypes.number.isRequired,
  descendants: PropTypes.number,
  getPostID: PropTypes.func
};
