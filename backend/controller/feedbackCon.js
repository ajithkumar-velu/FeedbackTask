import feedbackModel from "../models/feedbackModel.js";


const addFeedback = async (req, res) =>{
    try {
        let { name, email, rating, comment, userType } = req.body
        rating = Number(rating)

        const newFeedback = new feedbackModel({
            name: name, 
            email: email, 
            rating: rating, 
            comment: comment, 
            userType: userType
        })
        await newFeedback.save()
        res.json({success: true, message: "Thank for your Feedback", name})
    } catch (error) {
        console.log(error);

    }
}


const getRating = async (req, res) => {
    try {
        const distribution = await feedbackModel.aggregate([
            {
                $group: {
                    _id: "$rating",
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } } 
        ]);

        res.json(distribution);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// const getFeedbackTrends = async (req, res) => {
//     try {
//         const trends = await feedbackModel.aggregate([
//             {
//                 $group: {
//                     _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
//                     count: { $sum: 1 },
//                     avg_rating: { $avg: "$rating" }
//                 }
//             },
//             { $sort: { _id: 1 } }
//         ]);

//         res.json(trends);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const feedbacksFilter = async (req, res) => {
    const { startDate, endDate, minRating, maxRating, userType } = req.query;

    console.log(startDate, endDate, minRating, maxRating, userType);

    
    let filter = {};

    if (startDate) {
        filter.date = { ...filter.date, $gte: new Date(startDate) };
    }
    if (endDate) {
        filter.date = { ...filter.date, $lte: new Date(endDate) };
    }
    if (minRating) {
        filter.rating = { ...filter.rating, $gte: parseInt(minRating) };
    }
    if (maxRating) {
        filter.rating = { ...filter.rating, $lte: parseInt(maxRating) };
    }
    if (userType) {
        filter.userType = userType;
    }

    
    
    try {
        
        const result = await feedbackModel.aggregate([
            { $match: filter },  
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },                         
                    count: { $sum: 1 },                   
                    avg_rating: { $avg: "$rating" },      
                }
            },
            { $sort: { _id: 1 } }                       
        ]);

        
        
        
        const formattedResult = result.map(entry => ({
            date: entry._id,
            count: entry.count,
            avg_rating: entry.avg_rating
        }));
        console.log(formattedResult);

        
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getLatestReview = async (req, res) =>{
    try {
        const lastfeedbackSeller = await feedbackModel.find({ userType: "SELLER"}).sort({ _id: -1 }).limit(3)
        const lastfeedbackCustomer = await feedbackModel.find({ userType: "CUSTOMER"}).sort({ _id: -1 }).limit(3)
        res.json({lastfeedbackSeller, lastfeedbackCustomer})
    } catch (error) {
        console.log(error);
    }
}

const totalValues = async (req, res) =>{
    try {
        const total = await feedbackModel.countDocuments()
        const countOfSellerFb = await feedbackModel.find({ userType: "SELLER"}).countDocuments()
        const countOfCustomerFb = await feedbackModel.find({ userType: "CUSTOMER"}).countDocuments()
        res.json({total, countOfSellerFb, countOfCustomerFb})
    } catch (error) {
        console.log(error);
        
    }
}

export {addFeedback, getRating, /*getFeedbackTrends,*/ feedbacksFilter, getLatestReview, totalValues}