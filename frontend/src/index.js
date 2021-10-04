import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Suspense>,
  document.getElementById('root'),
);
