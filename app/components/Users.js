import React from 'react';
import PropTypes from 'prop-types';
import { fetchUser, fetchUserPosts } from '../utils/api';
import Loading from './Loading';
import Posts from './Post';
import toFullDateString from '../utils/helper';
import queryString from 'query-string';
import { ThemeConsumer } from '../contexts/Context';

function UserInfo({ created, karma }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`meta-info-${theme}`}>
          <span>
            joined <b>{toFullDateString(created)}</b>
          </span>
          <span>
            has <b>{karma}</b> karma
          </span>
        </div>
      )}
    </ThemeConsumer>
  );
}

UserInfo.propTypes = {
  created: PropTypes.number.isRequired,
  karma: PropTypes.number.isRequired
};

class SelectedUser extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired
  };

  state = {
    user: null,
    error: null
  };

  componentDidMount() {
    const { username } = this.props;
    (async () => {
      try {
        let user = await fetchUser(username);
        this.setState({ user });
      } catch (error) {
        this.setState({ error: 'Could not get User' });
        throw new Error(error);
      }
    })();
  }

  isLoading(dataType) {
    const { error } = this.state;
    return this.state[dataType] === null && error === null;
  }

  render() {
    const { user, error } = this.state;
    const { children } = this.props;
    return (
      <React.Fragment>
        {error && <p className='error center-text'>{error}</p>}

        {this.isLoading('user') && <Loading message='Fetching User' />}

        {!this.isLoading('user') && !error && (
          <React.Fragment>
            <h1 className='header'>{user.id}</h1>
            <UserInfo created={user.created} karma={user.karma} />
            {user.about && (
              <p
                dangerouslySetInnerHTML={{
                  __html: user.about
                }}></p>
            )}
          </React.Fragment>
        )}

        {!this.isLoading('user') && !error && children(user, this.isLoading)}
      </React.Fragment>
    );
  }
}

class UserPostList extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.func.isRequired
  };

  state = {
    posts: null,
    error: null
  };

  componentDidMount() {
    const { user } = this.props;
    (async () => {
      try {
        let userPosts = await fetchUserPosts(user);
        this.setState({ posts: userPosts });
      } catch (error) {
        this.setState({ error: 'Could not get User Posts' });
        throw new Error(error);
      }
    })();
  }

  render() {
    const { isLoading } = this.props;
    const { posts, error } = this.state;
    let loadingData = isLoading.bind(this);
    return (
      <React.Fragment>
        {error && <p className='error center-text'>{error}</p>}

        {loadingData('posts') && <Loading message='Fetching User Posts' />}

        {!loadingData('posts') && !error && posts.length <= 0 && (
          <p className='center-text'>This user has no posts</p>
        )}

        {!loadingData('posts') && !error && posts.length > 0 && (
          <React.Fragment>
            <h2>Posts</h2>
            <Posts data={posts} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default function User(props) {
  const { id: username } = queryString.parse(props.location.search);
  return (
    <SelectedUser username={username}>
      {(userData, loading) => (
        <UserPostList user={userData} isLoading={loading} />
      )}
    </SelectedUser>
  );
}
