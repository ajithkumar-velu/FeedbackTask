import express from "express";
// import { addFeedback, feedbacks, rating, trend } from "../controller/feedbackController.js";
import { addFeedback, feedbacksFilter, /*getFeedbackTrends,*/ getLatestReview, getRating, totalValues } from "../controller/feedbackCon.js";


const feedbackRouter= express.Router()

// postgresql 
// feedbackRouter.post('/add', addFeedback)
// feedbackRouter.get("/feedback", feedbacks)
// feedbackRouter.get("/rating", rating)
// feedbackRouter.get("/trend", trend)


// Mongodb
feedbackRouter.post('/add', addFeedback)
feedbackRouter.get('/rating', getRating)
// feedbackRouter.get('/trend', getFeedbackTrends)
feedbackRouter.get('/feedbackfilter', feedbacksFilter)
feedbackRouter.get('/lastfeedback', getLatestReview)
feedbackRouter.get('/total', totalValues)

export default feedbackRouter