import React, { Fragment, useEffect } from 'react';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const CreatePage = () => {
 
  return (
    <Fragment>
      <Header />
      <Create/>
    </Fragment>
  );
};

export default CreatePage;
