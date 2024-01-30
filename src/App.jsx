import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/DenseAppBar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import DenseAppBar from './components/DenseAppBar'
import MiniDrawer from './components/MiniDrawer'
import { Box } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DenseAppBar />
      <Box height={40} /> 
      <Box sx={{ display: 'flex' }}>
      
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
       
      </Box>
      
      
    </>
  )
}

export default App
