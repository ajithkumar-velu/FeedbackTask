
import PieChart from "./components/PieChart.jsx"
import Char from "./components/Char.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = "http://localhost:4000"


import Feedback from "./pages/Feedback.jsx"
import Navbar from "./components/Navbar.jsx";
import Dashbord from "./pages/Dashbord.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate()

  

  return (
    <div className="">
      <Navbar />
      {/* <Feedback/> */}
      {/* <Char />
      <PieChart/> */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Feedback />} />
        <Route path="/dashbord" element={<Dashbord />} />
      </Routes>



    </div>
  )
}

export default App
