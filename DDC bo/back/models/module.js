const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;

const moduleSchema = new Schema ({
    module_name : {
        type :String ,
        required : true
    } ,
    // image : {
    //     type :String ,
    //     required : true
    // }
}, {
    timestamps: true
});



module.exports = mongoose.model('module' , moduleSchema) ;
