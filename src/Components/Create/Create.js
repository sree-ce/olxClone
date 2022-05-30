import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/FirebaseContext'
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'

const Create = () => {
  const {register,handleSubmit,setError,formState:{errors}}=useForm();
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [categoty,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState('')
  const date = new Date()
  const handleCreateSubmit = (e)=>{
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
       

        firebase.firestore().collection('products').add({
          name:e.name,
          categoty:e.category,
          price:e.price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
          navigate('/')
        
      })
    })
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
              {...register('name',{required:"Product name is required"})}
              id="fname"
              name="name"
              
            />
            {errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              {...register('category',{required:"category is required"})}
              id="fname"
              name="category"
              
            />
            {errors.category && <p style={{color:"red"}}>{errors.category.message}</p>}
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
             type="number" 
             {...register('price',{required:"price is required"})}
             id="fname" name="price" />
            <br />
            {errors.price && <p style={{color:"red"}}>{errors.price.message}</p>}
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
          
            <br />
            <input 
            onChange={(e)=>{
              setImage(e.target.files[0])

            }} 
            // {...register('image',{required:"image is required"})}
            type="file" />
            <br />
            {/* {errors.image && <p style={{color:"red"}}>{errors.image.message}</p>} */}
            <button onClick={handleSubmit(handleCreateSubmit)} className="uploadBtn">upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
