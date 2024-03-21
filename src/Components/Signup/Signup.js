import React, { useState,useContext } from 'react';
import { doc, setDoc,getFirestore,collection,query,where,getDocs } from "firebase/firestore"; 
import Logo from '../../olx-logo.png';
import './Signup.css';
import { Firebasecontext } from '../../store/Firebasecontext';
import {getAuth,createUserWithEmailAndPassword,updateProfile,onAuthStateChanged} from "firebase/auth";
import { NavLink, useNavigate } from 'react-router-dom';


/// fun start
export default function Signup() {
  //States
  const [username,setusername] = useState('')
  const [email,setemail] = useState('')
  const [phone,setphone] = useState('')
  const [password,setpassword] = useState('')
  const [errorusername,seterrorusername] = useState('')
  const [errorphone,seterrorphone] = useState('')
  const [erroremail,seterroremail] = useState('')
  const [errorpassword,seterrorpassword] = useState('')
  const [userexerr,setuserexister] = useState('')


 
  const {firebase} =useContext(Firebasecontext) ?? {}
  const navigate = useNavigate()
     
  const handlesub = async (e)=>{
      e.preventDefault()
      

      try {

        const db = getFirestore()
        const auth = getAuth();
         
        const q = query(collection(db, 'user'), where("email", "==", email))
        const querySnapshot = await getDocs(q)
        let userex;
        querySnapshot.forEach((doc) => {
          userex =doc.data()
        });
        if (userex){
           setuserexister('Email already taken')
           return
        }
        else{
          setuserexister('')

        }
        if(!username){
          seterrorusername('Enter username')
          return
        }else{
          seterrorusername('')

        }


        if(!email){
          seterroremail('Enter Email')
          return
        }else{
          seterroremail('')

        }
        
        if(!phone){
          seterrorphone('Enter Phone')
          return
        }
        else{
          seterrorphone('')

        }
        if(!password){
          seterrorpassword('Enter password')
          return
        }else{
          seterrorpassword('')

        }
        
        const res = await createUserWithEmailAndPassword(auth, email, password);
    
        await updateProfile(auth.currentUser, { displayName: username });
    
        await setDoc(doc(db, 'user', res.user.uid), {
          name: username,
          email: email,
          phone: phone
        });
    
        navigate('/login');
      } catch (error) {
        console.error("Error:", error);
      }
      
    };
  

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={(e)=>handlesub(e)}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={username}
            onChange={(e)=>setusername(e.target.value)}
          />
       {errorusername && <h6> {errorusername}</h6>  }
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
          />
          {userexerr && <h6>{userexerr}</h6> }
          {erroremail && <h6> {erroremail}</h6>  }

          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phone}
            onChange={(e)=>setphone(e.target.value)}
          />
       {errorphone && <h6> {errorphone}</h6>  }

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
            onChange={(e)=>setpassword(e.target.value)}
          />
       {errorpassword && <h6> {errorpassword}</h6>  }

          <br />
          <br />
          <button>Signup</button>
        </form>
        <NavLink to={'/login'}>Login</NavLink>
      </div>
    </div>
  );
}
