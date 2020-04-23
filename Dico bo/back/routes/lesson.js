const express = require('express') ;
const Lesson = require('../models/lesson') ;
const router = express.Router() ;


router.route('/')
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /lessons');
    })

    .post((req, res, next) => {
        var  lesson = new Lesson({
            lesson_name : req.body.lesson_name ,
            module : req.body.module
        }) ;
        lesson.save()
            .then((lesson) => {
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



router.route('/:Id')
    // Find lessons by module id ( id = module_id )
    .get((req, res, next) => {
        Lesson.find({module : req.params.Id })
            .populate('module')
            .then(lessons => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(lessons);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /lessons/'+ req.params.Id);
    })

    // Put lessons ( id = lesson_id )
    .put((req, res, next) => {
        var  lesson = new Lesson({
            _id : req.params.Id,
            lesson_name : req.body.lesson_name ,
            module : req.body.module
        }) ;

        Lesson.findByIdAndUpdate(req.params.Id, {$set: lesson}, { new: true })
            .then((module) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(module);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    // Delete lessons by id ( id = lesson_id )
    .delete((req, res, next) => {
        Lesson.findByIdAndRemove(req.params.Id)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = router ;
