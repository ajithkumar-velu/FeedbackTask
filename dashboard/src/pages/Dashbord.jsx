import Char from '../components/Char'
import LastReview from '../components/LastReview'
import PieChart from '../components/PieChart'
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { useContext, useEffect, useState } from "react";
import TotalFeedback from '../components/totalFeedback';
import { FBContext } from '../../context/FBContext';
import images from '../assets/Assets';

const Dashbord = () => {

    const [latestFeedbackData, setlatestFeedbackData] = useState([])
    const { FBCount, countOfSeller, countOfCustomer } = useContext(FBContext)



    const latestFeedback = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/feedback/lastfeedback")
            // console.log(response.data.lastfeedbackSeller);

            setlatestFeedbackData([response.data.lastfeedbackSeller, response.data.lastfeedbackCustomer])

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        latestFeedback()
        console.log(latestFeedbackData[0])

    }, [])

    return latestFeedbackData[0] && (
        <div className="px-[4%] w-full bg-slate-100 pt-10" >
            <p className='md:text-4xl text-2xl font-bold  mb-12' >Feedback Dashbord</p>
            <div className='flex items-center justify-center flex-col mb-10 2xl:flex-row 2xl:gap-5' >

                <div className='flex flex-col lg:flex-row gap-5 2xl:gap-5' >
                    <p><LastReview card={latestFeedbackData[0]} /></p>
                    <p><LastReview card={latestFeedbackData[1]} /></p>
                </div>
                <div className='flex flex-col lg:flex-row 2xl:gap-5' >
                    <p><TotalFeedback count={countOfSeller} userType={"sellers"} image={images.seller_icon} /></p>
                    <p><TotalFeedback count={countOfCustomer} userType={'customers'} image={images.customers_icon} /></p>
                </div>
            </div>
            <div className='xl:flex justify-evenly' >

                <div className='xl:w-[70%] bg-white p-10 rounded-2xl' >

                    <Char />
                </div>
                <div className='bg-white rounded-2xl p-10 pb-0'>

                    <PieChart />
                </div>
            </div>
            <p></p>
        </div>
    )
}

export default Dashbord
