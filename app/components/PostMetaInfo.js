import React from 'react';
import PropTypes from 'prop-types';
import toFullDateString from '../utils/helper';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/Context';

export default function PostMetaInfo({ id, by, time, descendants }) {
  const theme = React.useContext(ThemeContext);
  return (
    <div className={`meta-info-${theme}`}>
      <span>
        by{' '}
        <Link
          to={{
            pathname: '/user',
            search: `?id=${by}`
          }}>
          {by}
        </Link>
      </span>
      <span>on {toFullDateString(time)}</span>
      {descendants !== undefined && (
        <span>
          with{' '}
          <Link
            to={{
              pathname: '/post',
              search: `?id=${id}`
            }}>
            {descendants}
          </Link>{' '}
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
