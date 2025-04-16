import React from 'react'
import Showcase from './components/Showcase'
import Header from './components/Header'
import Random from './components/Random'
import DishGenerator from './components/DishGenerator'
// import DishFromImage from './components/DishFromImage'

const App = () => {
  return (
    <div className='h-screen flex flex-col'>
      <Header/>
      {/* <Showcase/> */}
      {/* <Random/> */}
      {/* <DishFromImage/> */}
      <DishGenerator/>
    </div>
  )
}

export default App



  // apiKey: 
