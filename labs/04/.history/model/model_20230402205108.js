const mongoose = require('mongoose');

const contacts = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    notes: String,
    contactID: Number,
    date: Date
}, {collection:"contactInfo"});

const contactsInfoDb