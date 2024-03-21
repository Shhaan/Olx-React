import React,{useEffect, useState,useContext} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Post, { PostContext } from '../../store/PostContext';
 
function Posts({query}) {
  const [products,setproduct] = useState([])
  const navigate = useNavigate()
  console.log(query);
  useEffect(()=>{
    const fetchdata = async () =>{
     try{
      const db = getFirestore()
       const collectionRef = await collection(db, 'products');
       const querySnapshot = await  getDocs(collectionRef);
      const values = await querySnapshot.docs.map((prod)=>{
        
        return {
                 ...prod.data(),
                 id:prod.id
        }  })
     
        await setproduct(values)

     }
     catch{
          console.log('Something happens')
     }
    }

    fetchdata()
    
  },[])

  const {setPostDetail} = useContext(PostContext)
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          {products && products.filter((o)=>(
           query ? o.Name.toLowerCase().includes(query.toLowerCase()) : true

           )).map((obj,i)=>(
             
             
             
              <div   className="card">
                 
            <div className="favorite">
              <Heart></Heart>
            </div>
        <div 
        onClick={()=>{
          setPostDetail(obj)
       return  navigate('/viewproduct',{state:obj})
      }

        }
        >
            <div className="image">
              <img src={obj.downloadURL} alt="Products" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {obj?obj.Price:'Nun'}</p>
              <span className="kilometer">{obj?obj.Category:'Nun'}</span>
              <p className="name"> {obj?obj.Name:'Nun'}</p>
            </div>
            <div className="date">
              <span>
              {obj ? `${new Date(obj.createDate.toDate()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}` : ''}
              </span>
            </div>
         </div>

          </div>
          )
          )
          
}


        </div>
      </div>
      
    </div>
  );
}

export default Posts;
