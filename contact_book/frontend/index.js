import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';

const login = new Login('.login-form');
const register = new Login('.register-form');
login.init();
register.init();
//import './assets/css/style.css';
