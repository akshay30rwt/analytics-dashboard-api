const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    region: {
        type: String,
        required: true
    },
    soldBy: {
        type: String,
        required: true
    }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;