/**
 * Created by XD on 2016/7/22.
 */
var Car = function(engine) {
    this.engine = engine;
    this.wheel = null;
}
Car.prototype.init=function () {
    //this.engine.init();
    //this.wheel();
    //console.log('init car...');
}
Car.prototype.run = function() {
    this.engine.run();
    this.wheel.run();
    console.log('run car...');
}

module.exports = Car;