const mongoose = require('mongoose');

const structure = new mongoose.Schema({
    time:String,
    day:String,
    city:String,
    temp:String,
    condition:String,
});

const weatherStructure = mongoose.model('weatherStructure', structure);

module.exports = weatherStructure;
