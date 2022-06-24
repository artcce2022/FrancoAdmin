import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Main from './Main';
import 'helpers/initFA';
import '../src/utils/locales/i18n.js';

ReactDOM.render(
  <React.StrictMode>
    <Main>
      <App />
    </Main>
  </React.StrictMode>,
  document.getElementById('main')
);
