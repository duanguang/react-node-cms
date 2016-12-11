import 'babel-polyfill';
import * as ReactDOM from 'react-dom';
import { routes } from "./config/routeConfig";
ReactDOM.render(routes, document.getElementById('app'));
