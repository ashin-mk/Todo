import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import "./style.css"
const Register = () => {
    const [confirmpassword,setconfirmpassword]=useState({})
    const navigate=useNavigate()
    const [input,setInput]=useState({
        username:"",
        password:"",
    })
    const handlepasswords=(e)=>{
        e.preventDefault()
        setconfirmpassword({
            password:e.target.value
        })
    }
  const handlelogin=(e)=>{
    e.preventDefault()
if(input.username.length && input.password.length && confirmpassword.password.length){
    if(confirmpassword.password===input.password){
       axios.post("http://localhost:3001/Register",input).then(()=>{
        navigate("/")
       }).catch((err)=>{
        if(err.response.data.includes("username")){
            alert("username exist") 
        }else{
            console.log("err")
        }
       })
    }else{
        alert("Your passwords doesnot match")
    }
}else{
    if(input.username.length===0){
        alert("PLease enter username")
    }else{
        alert("Please enter password")
    }
}
    }
    const handleinputs=(data,e)=>{
e.preventDefault()
setInput({...input,[data]:e.target.value})
    }
  return (
    <div id='Register'>
        <img src='todoicon.jpg' className='heading' />
        <form id='formregister'>
            <label id='labeluserregister'>Username</label>
            <input id='Usernameregister' type="text" onChange={(e)=>handleinputs("username",e)}></input>
            <label id='labelpasswordregister'>Password</label>
            <input id="Passwordregister" type="password" onChange={(e)=>handleinputs("password",e)}></input>
            <label id='labelconfirmregister'>Confirm Password</label>
            <input id="Confirmpasswordregister" type="password" onChange={(e)=>handlepasswords(e)}></input>
            <button onClick={(e)=>handlelogin(e)}>Submit</button>
        </form>

    <p id='formregisterp'>Already have an account</p>
    <Link to="/" ><button id='registersubmit'>Login</button></Link>
    </div>
  )
}

export default Register