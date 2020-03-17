const express = require('express') ;
const router = express.Router() ;
const Lesson = require('../models/lesson')

router.route('/')
    .get((req, res, next) => {
        Lesson.find()
            .then(lessons => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(lessons);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req, res, next) => {
        var  lesson = new Lesson(req.body) ;
        lesson.save()
            .then((lesson) => {
                console.log('Lesson Created ', lesson);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(lesson);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /lessons');
    })

    .delete((req, res, next) => {
        Lesson.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = router ;
