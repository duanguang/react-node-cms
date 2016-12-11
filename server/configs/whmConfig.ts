import * as webpack from 'webpack';
import * as config from '../../webpack.config';
let compiler = webpack(config);
export const whmConfig = (app)=> {
    app.use(require('webpack-hot-middleware')(compiler));
};