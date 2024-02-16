import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faShoppingCart, faTrash, faEdit, faPlus, faMinus, faSearch, faUser, faLock } from '@fortawesome/free-solid-svg-icons'
// import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


