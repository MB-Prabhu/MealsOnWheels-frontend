import React, { useState } from 'react'
import Header from '../../components/Header'
import ExploreMenu from '../../components/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay'

const Home = () => {
  return (
    <div>
        <Header />
        <ExploreMenu  />
        <FoodDisplay />
    </div>
  )
}

export default Home