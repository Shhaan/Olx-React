import React, { Fragment, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getDownloadURL, getStorage, ref ,uploadBytes} from "firebase/storage";
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { getFirestore,setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const [Name,setName] = useState('')
  const [Category,setCategory] = useState('')
  const [Price,setPrice] = useState('')
  const [image,setImage] = useState()
  
  const [nerror,setnerror] =useState('')
  const [cerror,setcerror] =useState('')
  const [perror,setperror] =useState('')
  const [ferror,setferror] =useState('')


  const navigate = useNavigate()
  const handleSubmit = ()=>{
    if (Name.trim()==''){
      
      setnerror('Please enter name of Product')
      return 
    }
    if (Price.toString().trim() === '' || !Price.toString().match(/^[0-9]+$/)){
      setperror('Please enter a valid price for the product');
      return;
    }
    
    if (!image) {
      setferror('Please select an image for the product');
      return;
    }
    if (!Category){
      
      setcerror('Please enter Category of product')
      return 
    }
    
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image?.name}`);
    uploadBytes(storageRef,image)
    .then(({ref}) => {
      getDownloadURL(ref)
      .then((downloadURL) => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const userid = user.uid; 
            const db = getFirestore();
            setDoc(doc(db, 'products', userid + '_' + Date.now()), {
              Name,
              Price,
              Category,
              downloadURL,
              userId: userid,
              createDate: new Date()
            }).then(()=>{
              navigate('/')
            })
           
          }
        });
      })
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
    
    });


  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              value={Name}
              onChange={(e)=>setName(e.target.value)}
            />
            {nerror && <h6>{nerror}</h6>}
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              value={Category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            {cerror && <h6>{cerror}</h6>}

            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"  value={Price}
              onChange={(e)=>setPrice(e.target.value)}/>
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
          {perror && <h6>{perror}</h6>}
           
            <br />
            <input type="file" 
            onChange={(e)=>{
              if (e.target.files[0]){
              return setImage(e.target.files[0])}
            
            } 
            
            }

            />
            {ferror && <h6>{ferror}</h6>}

            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
           
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
