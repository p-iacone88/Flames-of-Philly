import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Home from './pages/Home.jsx';
import Asian from './pages/Asian.jsx';
import Halal from './pages/Halal.jsx';
import Latin from './pages/Latin.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
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
      }, {
        path: '/halal',
        element: <Halal />
      }, {
        path: '/latin',
        element: <Latin />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/footer',
        element: <Footer />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />

)
