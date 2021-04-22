import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import SignPage from './components/SignPage';

class IndexPage extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/" component={SignPage} />
          </Switch>
        </Router>
      </>
    )
  }
}

ReactDOM.render(<IndexPage />, document.getElementById('root'));
reportWebVitals();
