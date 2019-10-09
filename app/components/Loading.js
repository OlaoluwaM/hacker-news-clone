import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  message: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center'
  }
};

export default class Loading extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
  };

  static defaultProps = {
    message: 'Loading',
    speed: 300
  };

  state = {
    count: ''
  };

  interval = null;

  componentDidMount() {
    this.interval = setInterval(() => {
      const { count } = this.state;
      if (count.length >= 3) this.setState({ count: '' });
      else this.setState(({ count }) => ({ count: count + '.' }));
    }, this.props.speed);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { message } = this.props;
    const { count } = this.state;
    return <p style={styles.message}>{`${message}${count}`}</p>;
  }
}
