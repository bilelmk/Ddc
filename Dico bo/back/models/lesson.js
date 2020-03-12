const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;

const lessonSchema = new Schema ({
    lesson_name : {
        type :String ,
        required : true
    } ,
    mots : [{
        type :Schema.Types.ObjectId,
        ref : 'mot'
    }]
}, {
    timestamps: true
});



module.exports = mongoose.model('lesson' , lessonSchema) ;
