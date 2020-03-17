const express = require('express');
const mongoose = require('mongoose') ;
const bodyParser = require('body-parser');

const moduleRoutes = require('./routes/module') ;
const lessonRoutes = require('./routes/lesson') ;
const motRoutes = require('./routes/mot') ;
const userRoutes = require('./routes/user') ;



const app = express() ;
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/modules' , moduleRoutes);
app.use('/lessons' , lessonRoutes);
app.use('/mots' , motRoutes);
app.use('/users' , userRoutes)





mongoose.connect('mongodb://localhost:27017/Dico' ,  { useUnifiedTopology: true , useNewUrlParser: true} ).then(
    app.listen(3000)
).catch(
    err => console.log(err)
);
