import React from 'react';
import Posts from './Post';
import { fetchMainPosts } from '../utils/api';

export class TopPostDisplay extends React.Component {
  state = { data: null };
  componentDidMount() {
    (async () => {
      let posts = await fetchMainPosts('topstories');
      this.setState({ data: posts });
    })();
  }
  render() {
    const { data } = this.state;
    return <Posts data={data} />;
  }
}

export class NewPostDisplay extends React.Component {
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
