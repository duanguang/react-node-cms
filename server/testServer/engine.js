/**
 * Created by XD on 2016/7/22.
 */
var engine = function() {}

engine.prototype.init = function(cb) {
    console.log('init engine...');
    setTimeout(function() {
        console.log('asyncInit setTimeout');
        cb();
    }, 1000);
}

engine.prototype.run = function() {
    console.log('run engine...');
    return 'engine';
}

module.exports = engine;