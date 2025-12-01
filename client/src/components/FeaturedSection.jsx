// import React, { use } from 'react'
// import { Title } from './Title'
// import {dummyCarData} from '../assets/assets.js'
// import CarCard from './CarCard'
// import { useNavigate } from 'react-router-dom'
// export const FeaturedSection = () => {

//     const navigate=useNavigate();
//   return (
//     <div className='flest flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
//         <div>
//         <Title title="Featured Vehicles" subtitle="Explore our selection of premium vehicles available for your next adventure."/>

//         </div>
//         <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
//             {dummyCarData.slice(0,6).map((car) => (
//                 <div key={car._id}>
//                     <CarCard car={car}/>

//                 </div>

//             ))}

//         </div>
//         <button onClick={()=>{
//             navigate("/cars"); scrollTo(0,0);
//         }} className='mt-12 inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300'>
//             Explore All Cars <img src={assets.arrow_icon} alt="arrow"></img>
//         </button>
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react'
import { Title } from './Title'
import { assets } from '../assets/assets.js'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { carAPI } from '../services/api'

export const FeaturedSection = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedCars();
    }, []);

    const fetchFeaturedCars = async () => {
        try {
            const response = await carAPI.getAllCars();
            if (response.data.success) {
                setCars(response.data.cars.slice(0, 6));
            }
        } catch (error) {
            console.error('Error fetching featured cars:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flest flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
            <div>
                <Title title="Featured Vehicles" subtitle="Explore our selection of premium vehicles available for your next adventure."/>
            </div>

            {loading ? (
                <div className='mt-12 text-center'>
                    <p className='text-gray-500'>Loading featured cars...</p>
                </div>
            ) : (
                <>
                    <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                        {cars.map((car) => (
                            <div key={car._id}>
                                <CarCard car={car}/>
                            </div>
                        ))}
                    </div>

                    {cars.length === 0 && (
                        <div className='mt-12 text-center'>
                            <p className='text-gray-500'>No cars available at the moment.</p>
                        </div>
                    )}
                </>
            )}

            <button onClick={() => {
                navigate("/cars"); 
                window.scrollTo(0,0);
            }} 
            className='mt-12 inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300'>
                Explore All Cars <img src={assets.arrow_icon} alt="arrow"/>
            </button>
        </div>
    )
}
