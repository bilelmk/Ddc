const express = require('express') ;
const Module = require('../models/module');
const router = express.Router() ;

router.route('/')
    .get( (req, res, next) => {
        Module.find()
            .then(modules => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(modules);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req, res, next) => {
        var  module = new Module({
            module_name : req.body.module_name ,
        }) ;
        module.save()
            .then((module) => {
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
        res.statusCode = 403;
        res.end('DELETE operation not supported on /modules');
    });


router.route('/:Id')
    .get((req,res,next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /modules/'+ req.params.Id);
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /modules/'+ req.params.Id);
    })

    .put((req, res, next) => {
        var  module = new Module({
            _id : req.params.Id,
            module_name : req.body.module_name ,
        }) ;
        Module.findByIdAndUpdate(req.params.Id, {$set: module}, { new: true })
            .then((module) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(module);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete((req, res, next) => {
        Module.findByIdAndRemove(req.params.Id)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = router ;
