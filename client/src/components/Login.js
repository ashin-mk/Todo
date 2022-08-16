import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./style.css"
const Login = () => {
    const [input,setInput]=useState({
        username:"",
        password:""
    })
    const navigate=useNavigate()
  const handlelogin=(e)=>{
    e.preventDefault()
if(input.username.length && input.password.length){
axios.post("http://localhost:3001/Login",input).then((res)=>{
    localStorage.setItem("authorization",res.data.authtoken)
    localStorage.setItem("username",res.data.username)
    navigate("/Todo")
}).catch((err)=>{
    if(err.response.data.includes("password")){
        alert("enter a valid password")
    }else if(err.response.data.includes("username")){
        alert("enter a valid username") 
    }else{
        console.log("err")
    }
    
})
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
    <div id='login'>
        <img src='todoicon.jpg' className='heading' />
        <form id='formlogin'>
            <label id='labeluserlogin'>Username</label>
            <input id='Usernamelogin' type="text" onChange={(e)=>handleinputs("username",e)}></input>
            <label id='labelpasswordlogin'>Password</label>
            <input id="Passwordlogin" type="password" onChange={(e)=>handleinputs("password",e)}></input>
            <button onClick={(e)=>handlelogin(e)}>Submit</button>
        </form>
        <p id='loginp'>Don't have an account</p>
        <Link to="/Register"><button id='loginbutton'>Register</button></Link>
    </div>
  )
}

export default Login