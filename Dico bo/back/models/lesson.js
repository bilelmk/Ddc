const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;

const lessonSchema = new Schema ({
    lesson_name : {
        type :String ,
        required : true
    },
    image : {
        type :String ,
        required : true
    },
    module : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'module',
        required : true
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('lesson' , lessonSchema) ;
