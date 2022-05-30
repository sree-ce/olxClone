import React, { useState,useContext } from 'react';
import {FirebaseContext} from '../../store/FirebaseContext'
import Logo from '../../olx-logo.png';
import './Login.css';
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'

export default function Login() {
  const {register,handleSubmit,setError,formState:{errors}}=useForm();
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [err,setErr]=useState(false)
  const {firebase} =useContext(FirebaseContext)
  const navigate =useNavigate()
  const handleSubmitLogin =(e)=>{
   
    firebase.auth().signInWithEmailAndPassword(e.email,e.password).then(()=>{
      
      navigate('/')
    }).catch((error)=>{
    
      setErr(error.message)
    })

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {err&&<p style={{color:'red'}}>Not a valid user</p>}
        <form onSubmit={handleSubmit(handleSubmitLogin)}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
          {...register("email",{required:"email is required"})}
            className="input"
            type="email"
            
            id="fname"
            name="email"
            
          />
          {errors.email && <p style={{color:"red"}}>{errors.email.message}</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            {...register("password",{required:"password is required"})}
            id="lname"
            name="password"
            
          />
          {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}
        
          <br />
          <br />
          <button >Login</button> 
        </form>
       
       <button onClick={()=>{
         navigate('/signup')
       }}>signup</button>
      </div>
    </div>
  );
}


