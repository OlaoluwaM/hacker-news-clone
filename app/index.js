import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { TopPostDisplay, NewPostDisplay } from './components/Posts';
import Comment from './components/Comments';
import User from './components/Users';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <div className='container'>
            <Route exact path='/' component={TopPostDisplay} />
            <Route path='/new' component={NewPostDisplay} />
            <Route path='/post' component={Comment} />
            <Route path='/user' component={User} />
          </div>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
