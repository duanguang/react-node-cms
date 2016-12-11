"use strict";
var express = require('express');
var request = require('request');
var router = express.Router();
router.get('/image-proxy', function (req, res) {
    var path = decodeURIComponent(req.query.path);
    path ? request(path).pipe(res) : res.end();
});
module.exports = router;
