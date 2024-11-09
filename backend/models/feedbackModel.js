import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    rating: {type: Number, min:1, max:5, required: true},
    comment: {type: String, required: true},
    userType: {type: String, enum: ['CUSTOMER', 'SELLER'], required: true},
    date: {type: Date, default:Date.now}
});

const feedbackModel = mongoose.model.feedback || mongoose.model('feedback', feedbackSchema)


export default feedbackModel