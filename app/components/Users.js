import React from 'react';
import PropTypes from 'prop-types';
import { fetchUser, fetchUserPosts } from '../utils/api';
import Loading from './Loading';
import Posts from './Post';
import toFullDateString from '../utils/helper';
import useStartingData from '../reducers/DataReducer';
import queryString from 'query-string';
import { ThemeContext } from '../contexts/Context';

function UserInfo({ created, karma }) {
  const theme = React.useContext(ThemeContext);
  return (
    <div className={`meta-info-${theme}`}>
      <span>
        joined <b>{toFullDateString(created)}</b>
      </span>
      <span>
        has <b>{karma}</b> karma
      </span>
    </div>
  );
}

function SelectedUser({ username, children }) {
  const { state, dispatch, isLoading } = useStartingData();

  const { data, error } = state;

  React.useEffect(() => {
    (async () => {
      try {
        let user = await fetchUser(username);
        dispatch({ type: 'Success', data: user });
      } catch (error) {
        console.warn(error);
        dispatch({ type: 'Error', error: 'Could not get User' });
      }
    })();
  }, []);

  return (
    <React.Fragment>
      {error && <p className='error center-text'>{error}</p>}

      {isLoading() && <Loading message='Fetching User' />}

      {!isLoading() && !error && (
        <React.Fragment>
          <h1 className='header'>{data.id}</h1>
          <UserInfo created={data.created} karma={data.karma} />
          {data.about && (
            <p
              dangerouslySetInnerHTML={{
                __html: data.about
              }}></p>
          )}
        </React.Fragment>
      )}

      {!isLoading() && !error && children(data)}
    </React.Fragment>
  );
}

function UserPostList({ user }) {
  const { state, dispatch, isLoading } = useStartingData();

  const { data, error } = state;

  React.useEffect(() => {
    (async () => {
      try {
        let userPosts = await fetchUserPosts(user);
        dispatch({ type: 'Success', data: userPosts });
      } catch (error) {
        console.warn(error);
        dispatch({ type: 'Error', error: `Could not get User's Post` });
      }
    })();
  }, []);

  return (
    <React.Fragment>
      {error && <p className='error center-text'>{error}</p>}

      {isLoading() && <Loading message='Fetching User Posts' />}

      {!isLoading() && !error && data.length <= 0 && (
        <p className='center-text'>This user has no posts</p>
      )}

      {!isLoading() && !error && data.length > 0 && (
        <React.Fragment>
          <h2>Posts</h2>
          <Posts data={data} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default function User(props) {
  const { id: username } = queryString.parse(props.location.search);
  return (
    <SelectedUser username={username}>
      {(userData) => <UserPostList user={userData} />}
    </SelectedUser>
  );
}

UserInfo.propTypes = {
  created: PropTypes.number.isRequired,
  karma: PropTypes.number.isRequired
};
SelectedUser.propTypes = {
  username: PropTypes.string.isRequired
};
UserPostList.propTypes = {
  user: PropTypes.object.isRequired
};
