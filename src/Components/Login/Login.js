import React, { useState, } from 'react';
import { getAuth, signInWithEmailAndPassword,} from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';


function Login() {
  const [Email,setEmail] =useState('')
  const [password,setPassword] =useState('')
  const [passworder,setPassworder] =useState('')
  const [Emailer,setEmailer] =useState('')
  const [UserNotFound,setUserNotFound] = useState('')
  const navigate = useNavigate('')

  

  const handlesubmit = async (e) =>{
    e.preventDefault()
    
    if (!Email){
      setEmailer('Enter email')
      return
    }
    if (!password){
      setPassworder('Enter Password')
      return
    }

    try{
       const auth = getAuth()
      
      signInWithEmailAndPassword(auth, Email,password).then((userc)=>{
           
          navigate('/')
           
    })
      .catch((er)=>{

        setUserNotFound('Invalid user')
    })
        
       

    }
    catch{

    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlesubmit} >
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={Email}
            onChange={(e)=>setEmail(e.target.value)}
          />
            {Emailer && <h6>{Emailer}</h6>
            }

          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

{passworder && <h6>{passworder}</h6>
            }
          <br />
          <br />
        
        {UserNotFound && <h6>{UserNotFound}</h6>}

          <button>Login</button>
        </form>
        
        <NavLink to={'/signup'}>Signup</NavLink>
      </div>
    </div>
  );
}

export default Login;
