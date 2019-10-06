import React from 'react';
import { fetchMainPosts } from '../utils/api';
import PropTypes from 'prop-types';

export default class PostTemplate extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired
  };

  state = {
    posts: null,
    loading: true,
    error: null
  };
  componentDidMount() {
    fetchMainPosts(this.props.type)
      .then((posts) => {
        this.setState({
          posts,
          loading: false,
          error: null
        });
      })
      .catch((error) => {
        console.warn(error);
        this.setState({
          error: 'Could not get posts at this time'
        });
      });
  }
  isLoading = () => {
    const { loading, error } = this.state;
    return error === null && loading === true;
  };
  render() {
    const { posts, error } = this.state;

    if (this.isLoading()) {
      return <p>Loading...</p>;
    } else if (error) {
      return <p>{error}</p>;
    } else {
      return (
        <ul>
          {posts.map(({ id, by, title, descendants, url, time }) => {
            return (
              <li key={id} className='post'>
                <a href={url} className='link'>
                  {title}
                </a>
                <div className='meta-info-light'>
                  <span>
                    by <a href='#'>{by}</a>
                  </span>
                  <span>on {time}</span>
                  <span>
                    with <a href='#'>{descendants}</a> comments
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
  }
}
