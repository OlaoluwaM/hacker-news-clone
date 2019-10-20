import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from './contexts/Context';
import Nav from './components/Nav';
import Loading from './components/Loading';

const Comment = React.lazy(() => import('./components/Comments'));
const User = React.lazy(() => import('./components/Users'));
const TopPostDisplay = React.lazy(() => import('./components/TopPosts'));
const NewPostDisplay = React.lazy(() => import('./components/NewPosts'));

function App() {
  const [theme, setTheme] = React.useState('light');
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className='container'>
            <Nav toggleTheme={toggleTheme} />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path='/' component={TopPostDisplay} />
                <Route path='/new' component={NewPostDisplay} />
                <Route path='/post' component={Comment} />
                <Route path='/user' component={User} />
                <Route render={() => <h1 className='center-text'>404</h1>} />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
