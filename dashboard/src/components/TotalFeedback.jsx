import { useContext } from "react"

import { FBContext } from "../../context/FBContext"
// import PropTypes from 'prop-types';


// TotalFeedback.propTypes = {
//     count: PropTypes.number.isRequired, 
//     image: PropTypes.string.isRequired,
//     userType: PropTypes.string.isRequired,
//   };



const TotalFeedback = ({count, image, userType}) => {
    const {  CountingNumber } = useContext(FBContext)
  return (
    <div className="max-w-[450px] w-full bg-white rounded-2xl flex flex-col px-10 pb-10">
            <h2 className="text-green-800 mt-11 uppercase text-2xl mb-5 font-medium" >total {userType} feedbacks</h2>
            <div className="flex gap-10 items-center" >

                <img className="w-full max-w-24" src={image} alt="" />
                <p className="text-[50px]" >
                <CountingNumber endValue={count} duration={1000} />
                
                </p>
            </div>
        </div>
  )
}

export default TotalFeedback
