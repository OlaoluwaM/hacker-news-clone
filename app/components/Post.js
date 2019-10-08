import React from 'react';
import { fetchMainPosts } from '../utils/api';
import Comment from './Comments';
import Loading from './Loading';
import PropTypes from 'prop-types';
import PostTitle from './PostTitle';
import PostMetaInfo from './PostMetaInfo';

export default class Posts extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired
  };

  state = {
    posts: null,
    showComments: false,
    commentId: null,
    error: null
  };

  componentDidMount() {
    (async () => {
      try {
        let posts = await fetchMainPosts(this.props.type);
        this.setState({ posts });
      } catch (error) {
        console.warn(error);

        this.setState({
          error: 'Could not get posts at this time'
        });
      }
    })();
  }

  getPostID = (id) => {
    this.setState({
      showComments: true,
      commentId: id
    });
  };

  render() {
    const { posts, error, showComments, commentId } = this.state;
    return (
      <React.Fragment>
        {error && <p className='center-text error'>{error}</p>}

        {showComments && <Comment postID={commentId} />}

        <Loading data={posts} errorState={error} message='Fetching Posts' />

        {posts && !showComments && (
          <ul>
            {posts.map(({ id, by, title, descendants, url, time }) => {
              return (
                <li key={id} className='post'>
                  <PostTitle url={url} title={title} />
                  <PostMetaInfo
                    id={id}
                    by={by}
                    time={time}
                    descendants={descendants}
                    getPostID={this.getPostID}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </React.Fragment>
    );
  }
}
