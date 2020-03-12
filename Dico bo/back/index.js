const express = require('express');
const mongoose = require('mongoose') ;

const moduleRoutes = require('./routes/module') ;
const lessonRoutes = require('./routes/lesson') ;
const motRoutes = require('./routes/mot') ;



const app = express() ;

app.use('/modules' , moduleRoutes);
app.use('/lessons' , lessonRoutes);
app.use('/mots' , motRoutes);


mongoose.connect('mongodb://localhost:27017/Dico' ,  { useUnifiedTopology: true , useNewUrlParser: true} ).then(
    app.listen(3000)
).catch(
    err => console.log(err)
);
