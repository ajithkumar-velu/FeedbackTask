import axios from 'axios'
import { useEffect, useState } from 'react'
import { backendUrl } from '../App';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';

import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
import "react-datepicker/dist/react-datepicker.css";



const Char = () => {

    const [chartData, setChartData] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [minRating, setMinRating] = useState("");
    const [maxRating, setMaxRating] = useState("");
    const [userType, setUserType] = useState("");

    const fetchData = async () => {
        const params = {
            startDate: startDate ? startDate.toISOString().split("T")[0] : undefined,
            endDate: endDate ? endDate.toISOString().split("T")[0] : undefined,
            minRating: minRating || undefined,
            maxRating: maxRating || undefined,
            userType: userType || undefined,
        };
        try {
            const response = await axios.get(backendUrl + '/api/feedback/feedback', {params});

            const feedbackData = response.data;

            console.log(response.data);



            const dates = feedbackData.map(entry => entry.date);
            const counts = feedbackData.map(entry => parseInt(entry.count));
            const avgRatings = feedbackData.map(entry => parseFloat(entry.avg_rating));


            setChartData({dates: dates, counts: counts, avgRatings: avgRatings});
        } catch (error) {
            console.error('Error fetching feedback trend data:', error);
        }
    };
    const data = {
        labels: chartData.dates,
        datasets: [
            {
                label: 'Number of Feedbacks',
                data: chartData.count,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                fill: true,
                yAxisID: 'y',
            },
            {
                label: 'Average Rating',
                data: chartData.avgRatings,
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 123, 0.2)',
                fill: true,
                yAxisID: 'y1',
            }
        ]
    }
    const options = {
        responsive: true,
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Number of Feedbacks',
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Average Rating',
                }
            }
        }
    };
    useEffect(() => {
        fetchData();
        console.log(startDate, endDate, minRating, maxRating, userType);
        console.log();


    }, [startDate, endDate, minRating, maxRating, userType]);

    return (
        <div className='' >
           

            <div className='md:flex justify-between mb-10' >

            <div className='flex w-full md:w-[40%] mb-10 gap-3 flex-col' >
                <div className='flex justify-between mx-w-[300px]' >
                    
                    <DatePicker className='border-2 px-3 w-[250px] py-2 border-gray-400' selected={startDate} placeholderText='Start Date' onChange={(date) => setStartDate(date)} />
                </div>
                <div>
                    
                    <DatePicker className='border-2 px-3 py-2 border-gray-400 w-[250px]' selected={endDate} placeholderText='End date' onChange={(date) => setEndDate(date)} />
                </div>
                <div>
                    
                    <input className='border-2 px-3 py-2 border-gray-400 w-[250px]' type="number" value={minRating} min="1" max="5" placeholder='Min Rating' onChange={(e) => setMinRating(e.target.value)} />
                </div>
                <div>
                    
                    <input className='border-2 px-3 py-2 border-gray-400 w-[250px]' placeholder='Max Rating' type="number" value={maxRating} min="1" max="5" onChange={(e) => setMaxRating(e.target.value)} />
                </div>
                <div>
                    
                    <select  className='border-2 cursor-pointer px-3 py-2 border-gray-400 w-[250px]'  value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="">Select User Type</option>
                        <option value="CUSTOMER">Customer</option>
                        <option value="SELLER">Seller</option>
                    </select>
                </div>
            </div>
            <Line data={data} options={options} />
            </div>


        </div>
    )
}

export default Char


// import { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';
// import { backendUrl } from '../App';

// const FeedbackTrendChart = () => {
//     const [chartData, setChartData] = useState({});


//     // Fetch data from the backend
//     const fetchData = async () => {
//         try {
//             const response = await axios.get(backendUrl + '/api/feedback/feedback/');

            
//             const feedbackData = response.data;
            
//             // Process data for the chart
//             const dates = feedbackData.map(entry => entry.date);
//             const counts = feedbackData.map(entry => parseInt(entry.count));
//             const avgRatings = feedbackData.map(entry => parseFloat(entry.avg_rating));
            
//             setChartData({dates:dates, counts: counts, avgRatings: avgRatings});
//             console.log(chartData);
//         } catch (error) {
//             console.error('Error fetching feedback trend data:', error);
//         }
//     };
//     useEffect(() => {
//         fetchData();
//         console.log(chartData);
        
//     });

//     const data = {
//         labels: chartData.dates,
//         datasets: [
//             {
//                 label: 'Number of Feedbacks',
//                 data: chartData.counts,
//                 borderColor: 'blue',
//                 backgroundColor: 'rgba(0, 123, 255, 0.2)',
//                 fill: true,
//                 yAxisID: 'y',
//             },
//             {
//                 label: 'Average Rating',
//                 data: chartData.avgRatings,
//                 borderColor: 'green',
//                 backgroundColor: 'rgba(0, 255, 123, 0.2)',
//                 fill: true,
//                 yAxisID: 'y1',
//             }
//         ]
//     }

//     const options = {
//         responsive: true,
//         scales: {
//             y: {
//                 type: 'linear',
//                 display: true,
//                 position: 'left',
//                 title: {
//                     display: true,
//                     text: 'Number of Feedbacks',
//                 }
//             },
//             y1: {
//                 type: 'linear',
//                 display: true,
//                 position: 'right',
//                 title: {
//                     display: true,
//                     text: 'Average Rating',
//                 }
//             }
//         }
//     };

//     return (
//         <div>
//             <h2>Feedback Trend Over Time</h2>
//             <Line data={data} options={options} />
//         </div>
//     );
// };

// export default FeedbackTrendChart;

