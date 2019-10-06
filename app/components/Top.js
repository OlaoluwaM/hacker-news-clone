import React from 'react';
import { getAllPost } from '../utils/api';
import PropTypes from 'prop-types';

export default class PostDisplay extends React.Component {
  state = {
    id: null
  };
  componentDidMount() {}
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state.id, null, 2)}</pre>
      </div>
    );
  }
}
