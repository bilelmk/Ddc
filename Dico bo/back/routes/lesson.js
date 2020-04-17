const express = require('express') ;
const Lesson = require('../models/lesson') ;
const MIME_TYPE_MAP = require('../middleware/mime-type') ;
const multer = require('multer') ;

const router = express.Router() ;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});



router.route('/')
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /lessons');
    })

    .post(multer({ storage: storage }).single("image") ,(req, res, next) => {

        const url = req.protocol + "://" + req.get("host");

        var  lesson = new Lesson({
            lesson_name : req.body.lesson_name ,
            image: url + "/images/" + req.file.filename ,
            module : req.body.module
        }) ;

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



router.route('/:Id')
    // Find lessons by module id ( id = module_id )
    .get((req, res, next) => {
        Lesson.find({module : req.params.Id })
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
    .put(multer({ storage: storage }).single("image") ,(req, res, next) => {
        let imagePath = req.body.image ;
        if(req.file){
            const url = req.protocol + "://" + req.get("host");
            imagePath = url + "/images/" + req.file.filename ;
        }

        var  lesson = new Lesson({
            lesson_name : req.body.lesson_name ,
            image: url + "/images/" + req.file.filename ,
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
