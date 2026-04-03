// import React from 'react'

type props = {
    id:string;
    image: string;
    name: string;
    distance: string;
    isOpen: boolean;
}

const RestaurantCard = ({id, image, name, distance, isOpen}:props) => {
  return (
    <div>RestaurantCard</div>
  )
}

export default RestaurantCard