import { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute, Navbar } from './components';
import { Container } from '@mui/material';
import './App.css';

// Pages
const Feed = lazy(() => import('./pages/feed/Feed'));
const Login = lazy(() => import('./pages/login/Login'));
const Register = lazy(() => import('./pages/register/Register'));
const Wall = lazy(() => import('./pages/wall/Wall'));

const publicRoutes = [
  { path: '/login', component: <Login /> },
  { path: '/register', component: <Register /> },
];

const privateRoutes = [
  { path: '/', component: <Feed /> },
  { path: '/:id', component: <Wall /> },
];

const App = () => {
  return (
    <div className='App'>
      <Container sx={{ paddingBottom: '5rem' }}>
        <Navbar />

        <Switch>
          {publicRoutes.map(route => {
            return (
              <Route key={route.path} path={route.path} exact>
                {route.component}
              </Route>
            );
          })}

          {privateRoutes.map(route => {
            return (
              <ProtectedRoute
                key={route.path}
                exact
                component={route.component}
                path={route.path}
              />
            );
          })}
        </Switch>
      </Container>
    </div>
  );
};

export default App;
