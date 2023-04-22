import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const { products } = useSelector((state: any) => state.posts);

  return (
    <div className="App">
      <h1>HOME PAGE</h1>
      <p>{products[0]?.name}</p>
    </div>
  );
}

export default Home;
