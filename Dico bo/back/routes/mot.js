const express = require('express') ;
const router = express.Router() ;
const Mot = require('../models/mot')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.route('/')
    .get((req, res, next) => {
        Mot.find()
            .then(mots => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(mots);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req, res, next) => {
        var  mot = new Mot(req.body) ;
        mot.save()
            .then((mot) => {
                console.log('Mot Created ', mot);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(mot);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /mots');
    })

    .delete((req, res, next) => {
        Mot.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = router ;
