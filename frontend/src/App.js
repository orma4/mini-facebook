import { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute, Navbar } from './components';
const Login = lazy(() => import('./pages/login/Login'));
const Register = lazy(() => import('./pages/register/Register'));
const Wall = lazy(() => import('./pages/wall/Wall'));

const publicRoutes = [
  { path: '/', component: <div>Homepage</div> },
  { path: '/login', component: <Login /> },
  { path: '/register', component: <Register /> },
];

const privateRoutes = [{ path: '/wall', component: <Wall /> }];

const App = () => {
  return (
    <div className='App'>
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
    </div>
  );
};

export default App;
