import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PropTypes from 'prop-types';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className='container'></div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
