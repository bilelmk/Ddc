const express = require('express');
const mongoose = require('mongoose') ;

// const clientRoutes = require('./routes/client') ;


const app = express() ;

// app.use('/clients' ,clientRoutes);


mongoose.connect('mongodb://localhost:27017/Dico' , {useNewUrlParser: true} ).then(
    app.listen(3000)
).catch(
    err => console.log(err)
);
