const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;

const moduleSchema = new Schema ({
    module_name : {
        type :String ,
        required : true
    } ,
    lessons : [{
        type :Schema.Types.ObjectId,
        ref : 'lesson'
    }]
}, {
    timestamps: true
});



module.exports = mongoose.model('module' , moduleSchema) ;
