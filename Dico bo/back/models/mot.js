const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;

const motSchema = new Schema ({
    name : {
        type :String ,
        required : true
    },
    explication : {
        type :String ,
        required : true
    },
    image : {
        type :String ,
        required : true
    },
    lesson : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lesson',
        required : true
    },
}, {
    timestamps: true
});



module.exports = mongoose.model('mot' , motSchema) ;
