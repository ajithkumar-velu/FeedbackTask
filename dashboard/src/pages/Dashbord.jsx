import Char from '../components/Char'
import PieChart from '../components/PieChart'

const Dashbord = () => {
    return (
        <div className="px-[10%]" >
            <p className='md:text-4xl text-2xl font-bold mt-10 mb-12' >Feedback Dashbord</p>
            <Char />
            <PieChart />
        </div>
    )
}

export default Dashbord
