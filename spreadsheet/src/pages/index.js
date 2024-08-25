// src/pages/index.js
import React from 'react';
import Grid from '../components/Grid';

const Home = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center my-4">Spreadsheet Application</h1>
      <Grid />
    </div>
  );
};

export default Home;
