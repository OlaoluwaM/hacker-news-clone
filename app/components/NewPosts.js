import React from 'react';
import Posts from './Post';
import { fetchMainPosts } from '../utils/api';

export default class NewPostDisplay extends React.Component {
  state = { data: null };
  componentDidMount() {
    (async () => {
      let posts = await fetchMainPosts('newstories');
      this.setState({ data: posts });
    })();
  }
  render() {
    const { data } = this.state;
    return <Posts data={data} />;
  }
}
