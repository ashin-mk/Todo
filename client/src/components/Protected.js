import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Protected = ({children}) => {
const token=localStorage.getItem("authorization")
const navigate=useNavigate()
  return (
    <div>{
        token.length? children :<Navigate to="/"/>
        }</div>
  )
}

export default Protected