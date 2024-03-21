import React, { useState } from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';

function Home(props) {

  const [query ,setQuery] = useState('')

  console.log(query)
  return (
    <div className="homeParentDiv">
      <Header setQuery={setQuery}/>
      <Banner />
      <Posts query={query} />
      <Footer />
    </div>
  );
}

export default Home;
 
