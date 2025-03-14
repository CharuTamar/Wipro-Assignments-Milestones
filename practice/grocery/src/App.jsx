import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GroceryItem from './GroceryItem'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <GroceryItem name='Eggs' />
    <GroceryItem name='Banana' />
    <GroceryItem name='Strawberry' />
    <GroceryItem name='Bread' />
    </>
  )
}

export default App
