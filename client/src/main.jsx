import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Home from './pages/Home.jsx';
import Asian from './pages/Asian.jsx';
import Halal from './pages/Halal.jsx';
import Latin from './pages/Latin.jsx';
import About from './pages/About.jsx';
// import Navigation from './pages/Navigation.jsx';
import Footer from './pages/Footer.jsx';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/asian',
        element: <Asian />
      }, 
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />

)
