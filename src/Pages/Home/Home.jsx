import React, { useState } from 'react'
import Header from '../../components/Header'
import ExploreMenu from '../../components/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay'

const Home = () => {
  const [category, setCategory] = useState("all")
  return (
    <div>

        

        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay selectedCategory={category} setCategory={setCategory}/>
    </div>
  )
}

export default Home