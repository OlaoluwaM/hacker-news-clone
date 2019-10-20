import React from 'react';
import Loading from './Loading';
import PostList from './PostList';
import postsReducer from '../reducers/PostsReducer';

export default function Posts({ data }) {
  const [state, dispatch] = React.useReducer(postsReducer, {
    posts: null,
    error: null
  });

  const { posts, error } = state;

  React.useEffect(() => {
    if (data === 'Fetch Failed') dispatch({ type: 'Error' });
    else dispatch({ type: 'Success', data });
    return () => dispatch({ type: 'Reset' });
  }, [data]);

  const isLoading = () => {
    return posts === null && error === null;
  };

  return (
    <React.Fragment>
      {isLoading() && <Loading message='Fetching Posts' />}

      {error && <p className='center-text error'>{error}</p>}

      {!isLoading() && !error && (
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
