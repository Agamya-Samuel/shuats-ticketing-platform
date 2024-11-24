import mongoose from 'mongoose';

const approvedUserSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	checkedIn: {
		type: Boolean,
		default: false,
	},
	checkedInAt: {
		type: Date,
		default: null,
	},
	approvedAt: {
		type: Date,
		default: Date.now,
	},
});

export const ApprovedUser =
	mongoose.models.ApprovedUser ||
	mongoose.model('ApprovedUser', approvedUserSchema);
