import React,{useEffect} from 'react';
import Login from '../Components/Login/Login';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged,getAuth } from 'firebase/auth';
function LoginPage() {
  const navigate = useNavigate()
  useEffect(()=>{
    const auth = getAuth()
    onAuthStateChanged(auth,(user)=>{
      if (user){
           navigate('/')
      }
      })
  },[])
  return (
    <div>
      <Login />
    </div>
  );
}

export default LoginPage;
