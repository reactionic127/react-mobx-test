import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import * as mobx from 'mobx';
import 'semantic-ui-css/semantic.min.css';
import allStores from './stores';
import './index.css';
import App from './App';

mobx.useStrict(true);

ReactDOM.render(
  <BrowserRouter>
    <Provider stores={allStores}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
