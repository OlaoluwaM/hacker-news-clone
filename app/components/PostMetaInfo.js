import React from 'react';
import PropTypes from 'prop-types';
import toFullDateString from '../utils/helper';
import { Link } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/Context';

export default function PostMetaInfo({ id, by, time, descendants }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
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
      )}
    </ThemeConsumer>
  );
}

PostMetaInfo.propTypes = {
  by: PropTypes.string,
  time: PropTypes.number.isRequired,
  descendants: PropTypes.number,
  getPostID: PropTypes.func
};
