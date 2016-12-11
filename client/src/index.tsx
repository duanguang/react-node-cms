import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/*import 'antd/dist/antd.min.css';*/
import {routes} from "./config/routeConfig";


ReactDOM.render(
    routes,
    document.getElementById('app')
);