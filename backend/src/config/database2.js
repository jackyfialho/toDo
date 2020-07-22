const mongoose = require('mongoose');

const url = 'mongodb+srv://Danilo:Andilo271085@cluster0-icd6j.gcp.mongodb.net/todo?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;