// import React from 'react'

import { useSearchParams } from "react-router-dom"
import { useAppData } from "../context/AppContext"
import { useState } from "react"
import { IRestaurant } from "../types"

const Home = () => {
  const {location} = useAppData()

  const{searchParams} = useSearchParams()

  const search = searchParams.get("search") || ""

  const[restaurants, setRestaurants] = useState<IRestaurant[]>([])

  const[loading, setLoading] = useState(true);


  
  return (
    <div>Home</div>
  )
}

export default Home