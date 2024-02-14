import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Home from './pages/Home.jsx';
import RestaurantList from './pages/RestaurantList.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
// import Navigation from './pages/Navigation.jsx';
import Footer from './pages/Footer.jsx';
import NotFound from './pages/NotFound';
import SingleRestaurant from './pages/SingleRestaurant.jsx';

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
        path: '/restaurant',
        element: <RestaurantList />
      }, {
        path: '/restaurant/:id',
        element: <SingleRestaurant />
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
