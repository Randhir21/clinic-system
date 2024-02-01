import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home.jsx'
import Record from './components/Record.jsx'

import Mis from './components/Mis.jsx'


const router= createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/about",
          element: <Record />
        },
        {
          path: "/mis",
          element: <Mis />
        },
       

      ]
    }
  ]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
