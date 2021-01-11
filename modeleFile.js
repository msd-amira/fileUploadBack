const mongoose = require('mongoose');

const file = mongoose.Schema({
    name : String,
    path : String,
    datePost :  String,
    _created_at : {
        type : Date,
        default : Date.now()
    }

})

module.exports = mongoose.model('files',file);