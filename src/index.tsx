import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReactiveRender from './ReactiveRender';

ReactDOM.render(
  <React.StrictMode>
    { ReactiveRender(new App()) }
  </React.StrictMode>,
  document.getElementById('root')
);