import axios from 'axios'
import { backendUrl } from '../App'
import { useEffect, useState } from 'react'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    scales,
    
} from 'chart.js'
import {  Pie } from 'react-chartjs-2'

ChartJs.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    scales,
    Title,
    Tooltip,
    Legend
)

const PieChart = () => {
    const [ratingsData, setRatingData] = useState({})

    const fetchData = async () => {
        const response = await axios.get(backendUrl + '/api/feedback/rating')
        
        let rating = response.data.map(item => item._id + " Rating")
        let count = response.data.map(item => item.count)
        setRatingData({ rating: rating, count: count })
    }


    useEffect(() => {
        fetchData()
        

    }, [])

    const data1 = {
        labels: ratingsData.rating,
        datasets: [
            {
                data: ratingsData.count,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.5)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(154, 262, 0, 0.7)',
                    'rgba(54, 12, 235, 0.2)',
                    'rgba(254, 162, 235, 0.6)',

                ],
                hoverBackgroundColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(154, 262, 0, 1)',
                    'rgba(54, 12, 235, 1)',
                    'rgba(254, 162, 235, 1.5)',

                ],

                
                spacing: 5,
                weight: 10,

            },
        ],
    };

    
    return (
        <div className='flex w-[400px] gap-5' >
            {/* <Bar className='' options={options} data={data} /> */}
            <Pie className='' data={data1} />
        </div>
    )
}

export default PieChart
