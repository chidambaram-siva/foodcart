import React, { useState } from 'react'
import Header from "../../components/header/Header"
import Exploremenu from '../../components/exploremenu/Exploremenu'
import FoodDisplay from '../../components/fooddisplay/FoodDisplay';
import Appdownload from '../../components/appdownload/Appdownload';

const Home = () => {
  const[category,setCategory]=useState("All");
  return (
    <div>
      <Header />
      <Exploremenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <Appdownload />
    </div>
  )
}

export default Home
