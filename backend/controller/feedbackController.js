import pool from "../config/db.js";



//  add feedback

const addFeedback = async (req, res) => {
    try {
        let { name, email, rating, comment, userType } = req.body
        rating = Number(rating)



        const newFeedback = await pool.query("INSERT INTO feedback (name, email, rating, comment, userType, date) VALUES($1, $2, $3, $4, $5, CURRENT_DATE)", [name, email, rating, comment, userType])

        res.json({ success: true, message: "Thank for your Feedback" })

    } catch (error) {
        console.log(error.message);
    }
}

const feedbacks = async (req, res) => {
    const { startDate, endDate, minRating, maxRating, userType } = req.query;
    
    console.log(startDate, endDate, minRating, maxRating, userType);
    

    // Build the SQL query with optional filters
    let query = `
        SELECT date, COUNT(*) AS count, AVG(rating) AS avg_rating
        FROM feedback
        WHERE 1=1
    `;

    if (startDate) {
        query += ` AND date >= '${startDate}'`;
    }
    if (endDate) {
        query += ` AND date <= '${endDate}'`;
    }
    if (minRating) {
        query += ` AND rating >= ${minRating}`;
    }
    if (maxRating) {
        query += ` AND rating <= ${maxRating}`;
    }
    if (userType) {
        query += ` AND userType = '${userType}'`;
    }

    query += ` GROUP BY date ORDER BY date ASC;`;

    try {
        const result = await pool.query(query);
        console.log(result.rows);
        
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const rating = async (req, res)=>{
    try {
        const client = await pool.connect();
        const query = 'SELECT rating, COUNT(*) AS count FROM feedback GROUP BY rating;'
        const result = await client.query(query)
        client.release();

        // const result = await pool.query(`
        //     select rating, count(rating) as counting from feedback group by rating 
        //     `)
        res.json(result.rows)
    } catch (error) {
        console.log(error);
    }

}

const trend = async (req, res) => {
    try {
        const query = `
            SELECT date, COUNT(*) AS count, AVG(rating) AS avg_rating
            FROM feedback
            GROUP BY date
            ORDER BY date ASC;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export { addFeedback, feedbacks, rating, trend };