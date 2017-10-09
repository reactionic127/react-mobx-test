import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import allStores from './stores';
import * as mobx from 'mobx'
import './index.css';
import 'semantic-ui-css/semantic.min.css';
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
