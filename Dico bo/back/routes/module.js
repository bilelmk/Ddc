const express = require('express') ;
const router = express.Router() ;
const Module = require('../models/module')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.route('/')
    .get((req, res, next) => {
        Module.find()
            .then(modules => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(modules);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req, res, next) => {
        var  module = new Module(req.body) ;
        module.save()
            .then((module) => {
                console.log('Module Created ', module);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(module);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /modules');
    })

    .delete((req, res, next) => {
        Module.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = router ;
