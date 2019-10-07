import React from 'react';

export default class Loading extends React.Component {
  static defaultProps = {
    text: 'Loading'
  };
  isLoading = () => {
    const { data, errorState } = this.props;
    return data === null && errorState === null;
  };
  render() {
    return (
      <React.Fragment>
        {this.isLoading() && <p>{this.props.text}</p>}
      </React.Fragment>
    );
  }
}
