import React from 'react';
import styles from './App.module.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NoMatch } from './pages/NoMatch/noMatch';
import { Header } from './components/header/header';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { HelloPage } from './pages/hello/helloPage';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <div className={styles.container}>
          <Switch>
            <Route exact path="/" component={HelloPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
