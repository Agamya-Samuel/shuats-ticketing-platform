import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	mobile: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	course: {
		type: String,
		required: true,
	},
	moneyPaid: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ['pending', 'accepted', 'rejected'],
		default: 'pending',
	},
	approvedBy: {
		type: String,
		default: null,
	},
	approvedOn: {
		type: Date,
		default: null,
	},
	rejectedBy: {
		type: String,
		default: null,
	},
	rejectedOn: {
		type: Date,
		default: null,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export interface IRegistration {
	_id: string;
	name: string;
	email: string;
	mobile: string;
	userId: string;
	course: string;
	moneyPaid: string;
	status: 'pending' | 'accepted' | 'rejected';
	approvedBy?: string;
	approvedOn?: Date;
	rejectedBy?: string;
	rejectedOn?: Date;
	createdAt: Date;
}

export const Registration =
	mongoose.models.Registration ||
	mongoose.model('Registration', registrationSchema);
