/**
 * Created by DuanG on 2016/7/27.
 */
var carServer = require('./CarServer');
var CarFactory = function () { };
CarFactory.prototype.createCar = function () {
    console.log('CarFactory createCar1...');
    return new carServer();
};
module.exports = CarFactory;
