const express = require('express');
const mongoose = require('mongoose') ;
const bodyParser = require('body-parser');
const path = require("path");

const moduleRoutes = require('./routes/module') ;
const lessonRoutes = require('./routes/lesson') ;
const motRoutes = require('./routes/mot') ;
const userRoutes = require('./routes/user') ;

const app = express() ;


mongoose
    .connect(
        "mongodb+srv://username:pass@dico-ozjb6.mongodb.net/test?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });


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

app.use("/images", express.static(path.join(__dirname ,"images")));
app.use("/", express.static(path.join(__dirname ,"angular")));

app.use('/modules' , moduleRoutes);
app.use('/lessons' , lessonRoutes);
app.use('/mots' , motRoutes);
app.use('/users' , userRoutes);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname , "angular" , "index.html"))
});


module.exports = app;

