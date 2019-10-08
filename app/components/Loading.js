import React from 'react';

export default class Loading extends React.Component {
  static defaultProps = {
    message: 'Loading'
  };
  isLoading = () => {
    const { data, errorState } = this.props;
    return !data && !errorState;
  };
  render() {
    return (
      <React.Fragment>
        {this.isLoading() && <p>{this.props.message}</p>}
      </React.Fragment>
    );
  }
}
