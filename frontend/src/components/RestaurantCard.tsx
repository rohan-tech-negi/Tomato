// import React from 'react'

import { useNavigate } from "react-router-dom";

type props = {
    id:string;
    image: string;
    name: string;
    distance: string;
    isOpen: boolean;
}

const RestaurantCard = ({id, image, name, distance, isOpen}:props) => {

    const navigate = useNavigate()
  return (
    <div className={`cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md ${!isOpen ? "opacity-80" : "" }`} onClick={()=> navigate(`/restaurant/${id}`)}>
        <div className="relative h-40 w-full overflow-hidden">
            <img src={image} alt="" className={`h-full h-full object-cover transition duration-300 hover:scale-105 ${!isOpen ? "grayscale" : ""}`} />
        </div>
    </div>
  )
}

export default RestaurantCard