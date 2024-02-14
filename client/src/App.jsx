

// Import necessary libraries and components
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Import your components

import './App.css';
import Footer from './pages/Footer.jsx';
import Header from './pages/Header.jsx';
import Navigation from './pages/Navigation.jsx';

// Set up Apollo Client
const client = new ApolloClient({
  uri: '/graphql', // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>

      <div>
        <Header />
        <Navigation />
        <Outlet />

        <Footer />
      </div>

    </ApolloProvider>
  );
}

export default App;
