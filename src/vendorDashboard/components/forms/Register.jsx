import React,{useState} from 'react'
import {API_Path} from "../../data/apiPath"

export default function Register({handleLogin}) {
  let [username,setusername]=useState("")
  let [email,setemail]=useState("")
  let [password,setpassword]=useState("")
  let [error,seterror]=useState("")
  let [loading,setloading]=useState(true)
  async function handleSubmit(e){
    e.preventDefault()
    try{
      console.log(`${API_Path}/vendor/register`)
      const res=await fetch(`${API_Path}/vendor/register`,        
        {method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,email,password})
      })
      const data=await res.json()
      if(res.ok){
        console.log(data)
        setemail("")
    setusername("")
    setpassword("")
        alert("Vendor Registration Successfull")
        handleLogin()
      }
    }
    catch(error){
      console.log("registration Failed")
      alert("Registration Failed")
    }    
  }
  return (
    <div className="loginsection">        
    <h1>Vendor Registration</h1>
    <form onSubmit={handleSubmit} className='auth' >
    <label>User Name </label>
    <input type="text" name="username" value={username} onChange={(e)=>setusername(e.target.value)} required/>
        <label>email </label>
        <input type="text" name="email" value={email} onChange={(e)=>setemail(e.target.value)} required/>
        <label>Password </label>
        <input type="password" name="password" value={password} onChange={(e)=>setpassword(e.target.value)} required/>
        <center className="submit">
        <button type='submit'>Submit</button>
    </center> 
    </form> 
      
    
</div>
  )
}
