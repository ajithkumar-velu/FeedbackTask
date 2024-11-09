
import { useContext, useState } from "react";

import { FBContext } from "../../context/FBContext";



const LastReview = ({ card }) => {

    // console.log(card);
    const { Rating } = useContext(FBContext)

    const [cardData, setCardData] = useState(card)

    return (
        <div className="bg-white flex flex-col p-10 w-[420px] justify-center  h-[230px] rounded-2xl" >
            <h2 className="text-green-800 uppercase text-2xl mb-5 font-medium" >{cardData[0].userType} latest reviews</h2>
            <div className="flex flex-col gap-2" >

                {
                    cardData.map((item, idx) => (
                        <div key={idx} >

                            <p className="flex text-gray-900 items-center gap-1" >
                                <span >{item.comment}</span> ( <span className="flex text-gray-400 items-center gap-1">ratings <Rating rating={item.rating} size="15px" />{item.rating}</span>)
                            </p>

                        </div>)
                    )
                }
            </div>
            {/* <p></p>
        <h2>Customer review</h2>
        {
            latestFeedbackData[1].map((item, idx)=>(
                <div key={idx} >

                    <p>* {item.comment} ({item.rating} ratings)</p>
                </div>)
            )
        } */}
        </div>
    )
}

export default LastReview
