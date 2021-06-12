const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/WeatherInfo', 
{   
    useNewUrlParser: true, 
    useUnifiedTopology: true
});