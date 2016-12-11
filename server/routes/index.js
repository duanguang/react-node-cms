"use strict";
var express = require('express');
var path = require('path');
var dominSite_config_1 = require('../../dominSite.config');
var baseDir = path.resolve('.');
var router = express.Router();
router.get('*', function (req, res) {
    res.sendFile(path.join(baseDir, dominSite_config_1.compilePath + '.html'));
});
module.exports = router;
