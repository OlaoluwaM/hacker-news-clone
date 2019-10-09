import React from 'react';
import Loading from './Loading';
import PostList from './PostList';

export default class Posts extends React.Component {
  state = {
    posts: null,
    error: null
  };

  componentDidMount() {
    const { data } = this.props;
    this.setState({ posts: data });
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      this.setState({ posts: data });
      if (data === 'Fetch Failed') {
        this.setState({ error: 'Could not get posts at this time' });
      }
    }
  }

  isLoading = () => {
    const { posts, error } = this.state;
    return posts === null && error === null;
  };

  render() {
    const { posts, error } = this.state;
    return (
      <React.Fragment>
        {this.isLoading() && <Loading message='Fetching Posts' />}

        {error && <p className='center-text error'>{error}</p>}

        {!this.isLoading() && !error && (
          <ul>
            {posts.map(({ id, by, title, descendants, url, time }) => (
              <PostList
                key={id}
                id={id}
                by={by}
                title={title}
                url={url}
                time={time}
                descendants={descendants}
              />
            ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}
