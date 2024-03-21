import React, { useEffect, useState ,} from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { NavLink, useNavigate } from 'react-router-dom';
function Header({setQuery}) {
  const  [use,setname] = useState('')

  const navigate = useNavigate()
  useEffect(()=>{
    const auth = getAuth()
    onAuthStateChanged(auth,(user)=>{
      if (user){
           setname(user.displayName)
      }
      })
  },[])

  const handleLogout=()=>{
    const auth = getAuth()
    signOut(auth)
    setname('')
    navigate('/login')
  }
  
 
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
{/*         
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div> */}


        <div className="productSearch">
          <div className="input">
            <input
              type="search"
              placeholder="Find car,mobile phone and more..."

              onChange={(e)=>setQuery(e.target.value)}
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {use?
          <span>{use}</span>
        : <NavLink to={'/login'}>Login</NavLink>}
          

          <hr />
          
        </div>
        {use && <div className="loginPage">
          <span onClick={handleLogout}>Logout</span>
          
        </div>}

        <div  className="sellMenu" onClick={()=>use?navigate('/create'):navigate('/login')}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
