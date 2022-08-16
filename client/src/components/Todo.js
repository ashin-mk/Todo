import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./style.css"

const Todo = () => {
const [newacctivity,setnewactivity]=useState(false)
const [action,setaction]=useState(-1)
const [timeout,settimeouts]=useState()
const name=localStorage.getItem("username")
const navigate=useNavigate()
const  [data,setdata]=useState([])
const [input,setinput]=useState({
    activity:"",
    status:"pending",
    sec:0,
    min:0,
    hrs:0,
    time:"",
    action:"start"
})
const token=localStorage.getItem("authorization")
useEffect(()=>{
axios({
    method:"GET",
    url:"http://localhost:3001/activity",
    headers:{
        authorization:token
    }
}
).then((datas)=>{
console.log(datas.data)
setdata(datas.data)
})
},[])
const handleactivity=(e)=>{
setinput({...input,
    activity:e.target.value
})
}
const handlesubmit=()=>{
    axios({url:"http://localhost:3001/createactivity",
    method:"POST",
    headers:{
authorization:token
    },
    data:input}).then(()=>{
        window.location.reload(false)
    }).catch((err)=>{
        console.log(err)
    })
}
const handleaction=(k)=>{
    if(action>=0){
        alert("please pause or end ongoing task")
    }else{
        setaction(k)
    settimeouts(setInterval(()=>{
        stopwatch(k)},1000))
    }
   
}
const handlelogout=()=>{
    console.log("working")
    localStorage.setItem("authorization","")
    localStorage.setItem("username","")
    navigate("/")
}
const stopwatch=(k)=>{
    var updatedmin=data[k].min; var updatedhrs= data[k].hrs ;var updatedsec=data[k].sec
    if(updatedmin===60){
        updatedhrs++
        updatedmin=0
    }
    if(updatedsec===60){
        updatedmin++
        updatedsec=0
    }
updatedsec++
data[k].min=updatedmin;data[k].sec=updatedsec;data[k].hrs=updatedhrs
}
const handlepause=()=>{
clearInterval(timeout)
axios({url:"http://localhost:3001/pause",
    method:"PUT",
    headers:{
authorization:token
    },
    data:data[action]
}).then(()=>{
    window.location.reload(false)
    }).catch((err)=>{
        console.log(err)
    })

}
const handleend=()=>{
    clearInterval(timeout)
    axios({url:"http://localhost:3001/end",
        method:"PUT",
        headers:{
    authorization:token
        },
        data:data[action]
    }).then(()=>{
        window.location.reload(false)
        }).catch((err)=>{
            console.log(err)
        })
}

  return (
    <div id='todo'>
        <header id='Header'>

{name}
        </header>
        <sidebar id="Sidebar">
<div>
Todo List
</div>
<div>
    History
</div>
<div>
   <button id="logoutbutton" onClick={handlelogout}>Logout</button> 
</div>
        </sidebar>
        <button id='newactivitybutton' onClick={()=>setnewactivity(true)}>Add new activty</button>
        {
            newacctivity===true && 
            <div id='addnewactivity'>
            <input onChange={(e)=>handleactivity(e)}/>
            <button onClick={()=>handlesubmit()}>Submit</button>
            </div>
        }
        <div id="tablebox">
        <table id='table'>
            <tr>
                <th className='tablehead'>Activity</th>
                <th className='tablehead'>Status</th>
                <th className='tablehead'>Time taken (Hrs:Min:Sec)</th>
                <th className='tablehead'>action</th>
            </tr>
            {data.length>0 && data.map((data,i)=>{
                if(i===action){
                    return(  <tr key={i}>
                        <td>{data.activity}</td>
                        <td>ongoing</td>
                        <td>{data.timetaken}</td>
                        <td><button onClick={()=>handleend(i)}>end</button><button onClick={()=>{handlepause(i)}}>pause</button></td>
                    </tr>)
                }
              return(  <tr key={i}>
            <td>{data.activity}</td>
            <td>{data.status}</td>
            
            {data.status==="completed" &&
            <>
            <td>{data.time}</td>
            <td></td>
            </>
            }
            {data.status !=="completed" &&
            <>
            <td>{data.time}</td>
            <td onClick={()=>handleaction(i)}>{data.action}</td>
            </>
            }
            
        </tr>)
            })
            
            }
            
        </table>
        </div>
    </div>
  )
}

export default Todo