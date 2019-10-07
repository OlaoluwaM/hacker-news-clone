import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { TopPostDisplay, NewPostDisplay } from './components/Posts';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <div className='container'>
            <TopPostDisplay />
            {/* <NewPostDisplay /> */}
          </div>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
