const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	color: {
		type: String,
	},
	boards: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'board',
		},
	],
	type: {
		type: String,
		required: true,
		enum: ["ADMIN", "HOD", "FACULTY", "TRAINEE"]
	},
	status: {
		type: Boolean,
		default: true,
		enum: [true, false]
	}
});

module.exports = mongoose.model('user', userSchema);
