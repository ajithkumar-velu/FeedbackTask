import express from "express";
import { addFeedback, feedbacks, rating, trend } from "../controller/feedbackController.js";

const feedbackRouter= express.Router()

feedbackRouter.post('/add', addFeedback)
feedbackRouter.get("/feedback", feedbacks)
feedbackRouter.get("/rating", rating)
feedbackRouter.get("/trend", trend)

export default feedbackRouter