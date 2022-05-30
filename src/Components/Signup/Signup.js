import React, { useState,useContext } from 'react';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/FirebaseContext';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'



export default function Signup() {
  const {register,handleSubmit,setError,formState:{errors}}=useForm();
  const navigate = useNavigate()
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword]=useState('')
  const [success,setSucess]=useState(false)
  const {firebase} = useContext(FirebaseContext)
  console.log("errors",errors);
  const handleSubmitSignup =(e)=>{
    console.log("data ethiyeee");
    console.log(e.email,e.password);

    firebase.auth().createUserWithEmailAndPassword(e.email,e.password).then((result)=>{
      console.log("hhiiiiii");
      console.log('kjhjkh',result)

      result.user.updateProfile({displayName:username}).then(()=>{

        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:e.username,
          phone:e.phone
          
        }).then(()=>{
          setSucess(true)
     setTimeout(() => {
         navigate('/login')
     }, 3000);
          
        })
      })
    }).catch((err)=>{
      console.log(err)
    })
    
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit(handleSubmitSignup)}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            {...register("username",{required:"username is required",minLength:{value:4,message:"Should contain 4 characters"}})}
            className="input"
            type="text"
            id="fname"
            name="username"
            
            
          />
          {errors.username && <p style={{color:"red"}}>{errors.username.message}</p>}
          
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
          {...register("email",{required:"email is required"})}
            className="input"
            type="text"
            
            id="fname"
            name="email"
            
          />
          {errors.email && <p style={{color:"red"}}>{errors.email.message}</p>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            {...register("phone",{required:"phone number is required",minLength:{value:10,message:"phone number required atleast 10 digits"}})}
            id="lname"
            name="phone"
            
          />
          <br />
          {errors.phone && <p style={{color:"red"}}>{errors.phone.message}</p>}
          <label htmlFor="lname">Password</label>
          <br />
          <input
            
            className="input"
            type="password"
            {...register("password",{required:"password number is required",minLength:{value:6,message:"password should contain 6 characters"}})}
            id="lname"
            name="password"
            
          />
          {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}
          <br />
          <br />
          {success&&<p  style={{color:'green',fontFamily:'sans-serif',fontWeight:'bolder'}}>
  Form submitted
    </p>}
          <button type='submit'>Signup</button>
        </form>
        <button type='submit' onClick={()=>{
          navigate('/login')
        }}>Login</button>
      </div>
    </div>
  );
}
