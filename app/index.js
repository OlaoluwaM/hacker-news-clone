import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TopPostDisplay, NewPostDisplay } from './components/Posts';
import { ThemeProvider } from './contexts/Context';
import Comment from './components/Comments';
import User from './components/Users';
import Nav from './components/Nav';

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }));
    }
  };
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />
              <Switch>
                <Route exact path='/' component={TopPostDisplay} />
                <Route path='/new' component={NewPostDisplay} />
                <Route path='/post' component={Comment} />
                <Route path='/user' component={User} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
