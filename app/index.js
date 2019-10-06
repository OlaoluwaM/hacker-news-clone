import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PostDisplay from './components/Top';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className='container'>
          <PostDisplay />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
