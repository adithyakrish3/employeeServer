const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Company = new Schema(
    {
        name: { 
        	type: String, 
        	required: true
        },
        street_address: { 
        	type: String, 
        	required: true
        },
        city: { 
        	type: String, 
        	required: true
        },
        state: { 
        	type: String,
        },
        country: { 
        	type: String,
        	required: true
        },
        latitude: {
        	type: Number,
        	required: true
        },
        longitude: {
        	type: Number,
        	required: true
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('companies', Company)