import React,{useState,useEffect} from 'react'
import {API_Path} from "../../data/apiPath"


export default function Login({handlewelcome}) {
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  

  async function handleSubmit(e){
    try{
      e.preventDefault()
    const res= await fetch(`${API_Path}/vendor/login`,
      {method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,password})
      }      
    )
    const data=await res.json()
    if(res.ok){
      console.log(res)
      localStorage.setItem("loginToken",data.token)
      setemail("")
      setpassword("")
      alert("Login Success")
      handlewelcome()
    }    
    const vendorid=data.vendorId
    console.log( "checking for vendor id: ",vendorid)
    const vendorResponse=await fetch(`${API_Path}/vendor/single-vendor/${vendorid}`)
    const vendordata=await vendorResponse.json()
    if(vendorResponse.ok){
      const vendorFirmId=vendordata.vendorFirmid
      const vendorFirmName=vendordata.vendor.firm[0].firmName
      console.log("this is firm name",vendorFirmName)
      localStorage.setItem("firmId",vendorFirmId)
      localStorage.setItem("firmname",vendorFirmName)
      
    }
    window.location.reload()
    }
    catch(error){
      console.log(error)
      alert("Login Failed")
    }
  }

  return (
    <div className="loginsection">        
        <h1>Vendor Login</h1>
        <form action="" onSubmit={handleSubmit} className='auth'>
            <label htmlFor="email">Mail </label>
            <input type="text" name="email" value={email} onChange={e=>setemail(e.target.value)} required/>
            <label htmlFor="password">Password </label>
            <input type="password" name="password" value={password} onChange={e=>setpassword(e.target.value)} required/>
            <center className="submit">
            <button type='submit'>Submit</button>
        </center> 
        </form>       
        
    </div>
  )
}
