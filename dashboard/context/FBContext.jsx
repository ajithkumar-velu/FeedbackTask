import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../src/App";
import images from "../src/assets/Assets";

export const FBContext = createContext()

const FBContextProvider = (props)=>{

    const [FBCount, setFBCount] = useState()
    const [countOfSeller, setCountOfSeller] = useState()
    const [countOfCustomer, setCountOfCustomer] = useState()

    const fetchTotalFBCount = async () => {
        try {

            const response = await axios.get(backendUrl + "/api/feedback/total")
            console.log(response.data);
            setFBCount(response.data.total)
            setCountOfSeller(response.data.countOfSellerFb)
            setCountOfCustomer(response.data.countOfCustomerFb)

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    useEffect(() => {
        fetchTotalFBCount()
    }, [])
    const CountingNumber = ({ endValue, duration }) => {
        const [count, setCount] = useState(0);
      
        useEffect(() => {
          let start = 0;
          const incrementTime = duration / endValue; // Duration per increment
          
          const counter = setInterval(() => {
            start += 1;
            setCount(start);
            
            if (start === endValue) {
              clearInterval(counter);
            }
          }, incrementTime);
      
          return () => clearInterval(counter);
        }, [endValue, duration]);
      
        return <h1>{count}</h1>;
      };

    const Rating = ({ rating, size }) => {

        const stars = Array.from({ length: 5 }, (_, index) => (
            <img
                key={index}
                src={index < rating ? images.star_Icon : images.star_dull_icon}
           
                style={{ width: size, height: size }}
            />
        ));
    
        return <div style={{ display: 'flex' }}>{stars}</div>;
    };

    const value = {
        FBCount,
        countOfSeller,
        countOfCustomer,
        Rating,
        CountingNumber,
    }
    return(
        <FBContext.Provider value={value}>
            {props.children}
        </FBContext.Provider>
    )
}

export default FBContextProvider