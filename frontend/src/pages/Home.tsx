// import React from 'react'

import { useSearchParams } from "react-router-dom"
import { useAppData } from "../context/AppContext"
import { useState } from "react"
import type { IRestaurant } from "../types"
// import { IRestaurant } from "../types"

const Home = () => {
  const {location} = useAppData()

  const{searchParams} = useSearchParams()

  const search = searchParams.get("search") || ""

  const[restaurants, setRestaurants] = useState<IRestaurant[]>([])

  const[loading, setLoading] = useState(true);

  const getDistanceKm = (lat1:number, lon1: number, lat2: number, lon2: number): number=>{

    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2)*Math.PI / 180;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
  return (
    <div>Home</div>
  )
}

export default Home