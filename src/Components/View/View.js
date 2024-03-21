import React,{useContext,useEffect,useState} from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { getFirestore,doc,getDoc } from 'firebase/firestore';
import { useNavigate,useLocation } from 'react-router-dom';
function  View()  {
  const [userDetail, setUserDetail] = useState(null);
  const navigate = useNavigate()
  const {state} =useLocation()
  var {postDetail} = useContext(PostContext)
  if (!postDetail){
    var postDetail = state
  }

  useEffect(() => {
    if (!postDetail){
      var userId = state.userId
      var postDetail = state
      
    }
    else{
    var { userId } = postDetail;
  
       
  }


     
    const fetchData = async () => {
      try {
        const firestore = getFirestore();

 
      const userDocRef = doc(firestore, 'user', userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
         
        setUserDetail(userData)
      }          
 

      } catch (error) {
        console.error('Error fetching user detail:', error);
      }
    };

    fetchData();
  }, []);
   
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetail?postDetail.downloadURL:''}
          alt="Product image"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetail?postDetail.Price:''} </p>
          <span>{postDetail?postDetail.Name:''}</span>
          <p>{postDetail?postDetail.Category:''}</p>
          {/* <span>{postDetail.createDate}</span> */}
        </div>
       {userDetail && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetail.name}</p>
          <p>{userDetail.phone}</p>
          <p>{userDetail.email}</p>

        </div>}
      </div>
    </div>
  );
}
export default View;
