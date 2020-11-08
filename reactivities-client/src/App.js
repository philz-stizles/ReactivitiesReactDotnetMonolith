import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Routes from './routes/index';

function App() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Routes />
      <Footer></Footer>
    </React.Fragment>
  );
}

export default App;
