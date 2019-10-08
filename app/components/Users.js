import React from 'react';
import { fetchUser, fetchUserPosts } from '../utils/api';
import Loading from './Loading';
import Posts from './Post';
import toFullDateString from '../utils/helper';
import queryString from 'query-string';

function UserInfo({ created, karma }) {
  return (
    <div className='meta-info-light'>
      <span>
        joined <b>{toFullDateString(created)}</b>
      </span>
      <span>
        has <b>{karma}</b> karma
      </span>
    </div>
  );
}

export default class User extends React.Component {
  state = {
    user: null,
    posts: null,
    error: null
  };
  componentDidMount() {
    const { location } = this.props;
    const { id: user } = queryString.parse(location.search);

    (async () => {
      try {
        let userData = await fetchUser(user);
        this.setState({ user: userData });
      } catch (error) {
        console.warn(error);
        this.setState({ error: 'Could not get User' });
      }

      try {
        let userPosts = await fetchUserPosts(this.state.user);
        this.setState({ posts: userPosts });
      } catch (error) {
        console.warn(error);
        this.setState({ error: 'Could not get User Posts' });
      }
    })();
  }
  isLoading = (dataType) => {
    const { error } = this.state;
    return this.state[dataType] === null && error === null;
  };
  render() {
    const { user, error, posts } = this.state;
    return (
      <React.Fragment>
        {!this.isLoading('user') && error && (
          <p className='error center-text'>{error}</p>
        )}

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

        {!this.isLoading('user') && this.isLoading('posts') && (
          <Loading message='Fetching User Posts' />
        )}

        {!this.isLoading('posts') && !error && posts.length <= 0 && (
          <p className='center-text'>This user has no posts</p>
        )}
        {!this.isLoading('posts') && !error && posts.length > 0 && (
          <React.Fragment>
            <h2>Posts</h2>
            <Posts data={posts} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
