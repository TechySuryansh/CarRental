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
import React from 'react'
import { Title } from './Title'
import { dummyCarData, assets } from '../assets/assets.js'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'


export const FeaturedSection = () => {

    const navigate = useNavigate();

    return (
        <div className='flest flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
            <div>
                <Title title="Featured Vehicles" subtitle="Explore our selection of premium vehicles available for your next adventure."/>
            </div>

            <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {dummyCarData.slice(0,6).map((car) => (
                    <div key={car._id}>
                        <CarCard car={car}/>
                    </div>
                ))}
            </div>

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
