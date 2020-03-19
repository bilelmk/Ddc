const express = require('express') ;
const router = express.Router() ;
const Module = require('../models/module');
const multer = require('multer') ;


const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

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
    .get( (req, res, next) => {
        Module.find()
            .then(modules => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(modules);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post(multer({ storage: storage }).single("image"), (req, res, next) => {
        const url = req.protocol + "://" + req.get("host");
        var  module = new Module({
            module_name : req.body.module_name ,
            image: url + "/images/" + req.file.filename ,
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
        Module.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


router.route('/:Id')
    // .get(cors.cors,(req,res,next) => {
    //     Dishes.findById(req.params.dishId)
    //         .populate('comments.author')
    //         .then((dish) => {
    //             res.statusCode = 200;
    //             res.setHeader('Content-Type', 'application/json');
    //             res.json(dish);
    //         }, (err) => next(err))
    //         .catch((err) => next(err));
    // })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /modules/'+ req.params.Id);
    })
    // .put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    //     Dishes.findByIdAndUpdate(req.params.dishId, {
    //         $set: req.body
    //     }, { new: true })
    //         .then((dish) => {
    //             res.statusCode = 200;
    //             res.setHeader('Content-Type', 'application/json');
    //             res.json(dish);
    //         }, (err) => next(err))
    //         .catch((err) => next(err));
    // })
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
