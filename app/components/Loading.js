import React from 'react';

export default class Loading extends React.Component {
  static defaultProps = {
    message: 'Loading'
  };
  render() {
    return <p>{this.props.message}</p>;
  }
}
