import React from 'react'

export default function Navbar({handleLogin,handleRegister,showLogout,handleLogout}) {
  let firmName=localStorage.getItem("firmname")
  console.log(firmName)

  return (    
    <div className="navSection">      
        <div className="company">Vendor DashBoard</div>  
        <div className="firmName">
          <h3>Firm Name: {firmName}</h3>
        </div>      
        <div className="userAuth">
          {!showLogout?(<><span onClick={handleLogin}>Login / 
            </span><span onClick={handleRegister}>Register</span></> ):(<span onClick={handleLogout} >Logout</span>)}
           
              
        </div>
    </div>
  )
}
