const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var RentalSchema = new Schema({
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
    }

});

var Rental = mongoose.model('Rental', RentalSchema);

module.exports = (Rental);