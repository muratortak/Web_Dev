const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var SalesSchema = new Schema({
    type: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true,
    },

    rooms: {
        type: String,
        required: true
    },

    squareFeet: {
        type: String,
        required: true
    },

    age: {  
        type: String,
        required: true
    },

    totalStory: {
        type: String,
        requried: true
    },

    floor: {
        type: String,
        required: true
    },

    heatStyle: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    neighbor: {
        type: String,
        required: true
    },

    img: [
            { 
                destination: {
                    type: String,
                    required: true,
                    trim: true
                    },
                    filename: {
                    type: String,
                    required: true
                    }
            }
        ]
});

var Sales = mongoose.model('Sales', SalesSchema);

module.exports = (Sales);