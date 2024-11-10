import { useContext, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios'
import { backendUrl } from "../App"
import { FBContext } from "../../context/FBContext"
import images from "../assets/Assets"

const Feedback = () => {

    const [name, setName] = useState("")
    const [email, setEamil] = useState("")
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [userType, setUserType] = useState("")


    const { Rating } = useContext(FBContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            const response = await axios.post(backendUrl + "/api/feedback/add", { name, email, rating, comment, userType })
            console.log(response.data)

            if (response.data.success) {
                toast.success(response.data.message)
                setName("")
                setEamil("")
                setRating(0)
                setComment("")
                setUserType("")
            }

        } catch (error) {
            console.log(error);

            toast.error(error.message)
        }
    }
    

    return (
        <div className="px-[10%] flex justify-center" >

            <form onSubmit={onSubmitHandler} className="flex flex-col gap-2 w-full sm:w-[500px] text-center mt-[100px] bg-slate-100 px-10 py-14 rounded-lg" >
                <h1 className="text-3xl mb-3 font-medium" >Rate your experience</h1>
                <p className="text-gray-700 mb-2" >We highly value your feedback! Kindly take a moment to rate your experience and provide us with your value feedback</p>
                <div className="flex flex-col gap-5" >

                    <input onChange={(e) => setName(e.target.value)} value={name} className="px-3 py-2 border border-gray-300" type="text" placeholder="Name" />
                    <input onChange={(e) => setEamil(e.target.value)} value={email} className="px-3 py-2 border border-gray-300" placeholder="Email" />
                    {/* <label htmlFor="rating" className="text-start text-gray-600 text-md w-full"><p>Rate your experience 1 to 5</p><input id="rating" className="w-full" required onChange={(e) => setRating(e.target.value)} value={rating} type="range" min="1" max="5" /></label> */}
                    <p className="text-start text-gray-600 text-md w-full font-medium" >RATE 1 TO 5</p>
                    <div className="flex gap-10 justify-center items-center" >
                        <img onClick={()=>setRating(1)} className="cursor-pointer w-full max-w-[40px] max-h-[40px]" src={rating>=1? images.star_Icon : images.star_dull_icon} alt="" />
                        <img onClick={()=>setRating(2)} className="cursor-pointer w-full max-w-[40px] max-h-[40px]" src={rating>=2? images.star_Icon : images.star_dull_icon} alt="" />
                        <img onClick={()=>setRating(3)} className="cursor-pointer w-full max-w-[40px] max-h-[40px]" src={rating>=3? images.star_Icon : images.star_dull_icon} alt="" />
                        <img onClick={()=>setRating(4)} className="cursor-pointer w-full max-w-[40px] max-h-[40px]" src={rating>=4? images.star_Icon : images.star_dull_icon} alt="" />
                        <img onClick={()=>setRating(5)} className="cursor-pointer w-full max-w-[40px] max-h-[40px]" src={rating==5? images.star_Icon : images.star_dull_icon} alt="" />
                    </div>
                    
                    <textarea required onChange={(e) => setComment(e.target.value)} value={comment} className="px-3 py-2 border border-gray-300"placeholder="Write comment here"></textarea>
                    <select required onChange={(e) => setUserType(e.target.value)} value={userType} className="px-3 py-2 border border-gray-300 mb-5"
                        >
                        <option value="">Select User Type</option>
                        <option value="CUSTOMER">CUSTOMER</option>
                        <option value="SELLER">SELLER</option>
                    </select>
                </div>
                <button type="submit" className="bg-green-800 text-white py-2" >SUBMIT</button>
            </form>
        </div>
    )
}

export default Feedback
