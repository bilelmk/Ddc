const express = require('express') ;
const Mot = require('../models/mot')
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
        res.end('GET operation not supported on /mots');
    })

    .post(multer({ storage: storage }).single("image"),(req, res, next) => {
        const url = req.protocol + "://" + req.get("host");
        var  mot = new Mot({
            name : req.body.name ,
            explication : req.body.explication ,
            image: url + "/images/" + req.file.filename ,
            lesson: req.body.lesson
        }) ;
        mot.save()
            .then((mot) => {
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
        res.statusCode = 403;
        res.end('DELETE operation not supported on /mots');
    });


router.route('/:Id')
    // Find Mots by lesson id ( id = module_id )
    .get((req, res, next) => {
        Mot.find({lesson : req.params.Id })
            // .populate('lesson')
            .then(lessons => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(lessons);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /mots/'+ req.params.Id);
    })

    .put(multer({ storage: storage }).single("image") ,(req, res, next) => {
        let imagePath = req.body.image ;
        if(req.file){
            const url = req.protocol + "://" + req.get("host");
            imagePath = url + "/images/" + req.file.filename ;
        }
        var  mot = new Mot({
            _id : req.body._id,
            name : req.body.name ,
            explication : req.body.explication ,
            image: imagePath ,
            lesson: req.body.lesson
        }) ;
        Mot.findByIdAndUpdate(req.params.Id,{$set: mot} ,{new : true})
            .then((mot) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(mot);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete((req, res, next) => {
        Mot.findByIdAndRemove(req.params.Id)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = router ;
