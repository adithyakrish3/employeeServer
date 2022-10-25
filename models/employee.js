const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = new Schema(
    {
        firstName: { 
        	type: String, 
        	required: true
        },
        lastName: { 
        	type: String, 
        	required: true
        },
        designation: { 
        	type: String, 
        	required: true
        },
        dob: { 
        	type: Date, 
        	required: true
        },
        email: { 
        	type: String,
        	trim: true,
	        lowercase: true,
	        unique: true,
        	required: true,
        	validate: {
			    validator: function(e) {
			        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e);
			    },
			    message: "Please enter a valid email"
			},
        },
        status: { 
        	type: Boolean, 
        	required: true
        },
        company: { 
        	type: String, 
        	required: true
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model('employees', Employee)