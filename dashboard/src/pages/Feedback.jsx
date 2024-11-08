import { useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios'
import { backendUrl } from "../App"

const Feedback = () => {

    const [name, setName] = useState("")
    const [email, setEamil] = useState("")
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState("")
    const [userType, setUserType] = useState("")



    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            const response = await axios.post(backendUrl + "/api/feedback/add", { name, email, rating, comment, userType })
            console.log(response.data)

            if (response.data.success) {
                toast.success(response.data.message)
                setName("")
                setEamil("")
                setRating(1)
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
                <h1 className="text-3xl font-medium" >Rate your experience</h1>
                <p>We highly value your feedback! Kindly take a moment to rate your experience and provide us with your balue feedback</p>
                <div className="flex flex-col gap-5" >

                    <input onChange={(e) => setName(e.target.value)} value={name} className="px-3 py-2 border border-gray-300" type="text" placeholder="Name" />
                    <input onChange={(e) => setEamil(e.target.value)} value={email} className="px-3 py-2 border border-gray-300" placeholder="Email" />
                    <label htmlFor="rating" className="text-start text-gray-600 text-md w-full"><p>Rate your experience 1 to 5</p><input id="rating" className="w-full" required onChange={(e) => setRating(e.target.value)} value={rating} type="range" min="1" max="5" /></label>
                    
                    <textarea required onChange={(e) => setComment(e.target.value)} value={comment} className="px-3 py-2 border border-gray-300"placeholder="Write comment here"></textarea>
                    <select required onChange={(e) => setUserType(e.target.value)} value={userType} className="px-3 py-2 border border-gray-300 mb-5"
                        >
                        <option value="">Select User Type</option>
                        <option value="CUSTOMER">CUSTOMER</option>
                        <option value="SELLER">SELLER</option>
                    </select>
                </div>
                <button type="submit" className="bg-green-600 text-white py-2" >SUBMIT</button>
            </form>
        </div>
    )
}

export default Feedback
