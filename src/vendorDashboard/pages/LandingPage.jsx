import React,{useState,useEffect} from 'react'
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Login from "../components/forms/login.jsx"
import Register from "../components/forms/Register.jsx"
import AddFirm from "../components/forms/AddFirm.jsx"
import AddProduct from '../components/forms/AddProduct.jsx'
import Welcome from '../components/welcome.jsx'
import AllProducts from "../components/AllProducts.jsx"

export default function LandingPage() {
  let [showLogin,setShowLogin]=useState(false)
  let [showRegister,setShowRegister]=useState(false)
  let [showAddFirm,setAddFirm]=useState(false)
  let [showAddProduct,setAddProduct]=useState(false)
  let [showwelcome,setwelcome]=useState(false)
  let [showAllProducts,setShowAllProducts]=useState(false)
  let[showLogout,setLogout]=useState(false)
  let [showFirmTitle,setShowFirmTitle]=useState(true)

  
  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setLogout(true);  
      setwelcome(true);  
    }
  }, []);

  useEffect(() => {
    const firmName = localStorage.getItem("firmname");
    const firmId = localStorage.getItem('firmId')
    if (firmName || firmId) {
      setShowFirmTitle(false);
      setwelcome(true);   
     
  }
  else{}
},[]);

  function handleLogout() {
    if (confirm("Are you sure you want to Logout?")) {
      localStorage.removeItem("loginToken");
      localStorage.removeItem("firmId");
      localStorage.removeItem("firmname")
      setLogout(false); 
      setShowFirmTitle(true )
      setwelcome(false)
    }
  }

  function handleLogin(){
    setShowLogin(true)
    setShowRegister(false) 
    setAddFirm(false)  
    setAddProduct(false) 
    setwelcome(false)
    setShowAllProducts(false)             
  }
  function handlewelcome(){
    setShowLogin(false)
    setwelcome(true)
    setShowRegister(false) 
    setAddFirm(false)  
    setAddProduct(false) 
    setShowAllProducts(false)             
  }
  function handleRegister(){
    setShowLogin(false)
    setShowRegister(true) 
    setAddFirm(false)  
    setAddProduct(false)  
    setShowAllProducts(false) 
    setwelcome(false)          
  }
  function handleFirm(){
    if(showLogout){
      setShowLogin(false)
    setShowRegister(false) 
    setAddFirm(true)  
    setAddProduct(false)
    setShowAllProducts(false) 
    setwelcome(false)
    }
    else{
      alert("Please try to login")
      setShowLogin(true)
    }
                
  }
  function handleProduct(){
    if(showLogout)
    {setShowLogin(false)
    setShowRegister(false) 
    setAddFirm(false)  
    setAddProduct(true) 
    setShowAllProducts(false) 
    setwelcome(false) }   
    else{
      alert("Please try to login")
      setShowLogin(true)
    }        
  }
  function handleAllProducts(){
    if(showLogout)
   { setShowLogin(false)
    setShowRegister(false) 
    setAddFirm(false)  
    setAddProduct(false) 
    setShowAllProducts(true)
    setwelcome(false)
  }
    else{
      alert("Please try to login")
      setShowLogin(true)
    }
  }

  return (
    <>
    <section className="landingpage">
        <Navbar handleLogin={handleLogin} handleRegister={handleRegister} showLogout={showLogout} handleLogout={handleLogout} ></Navbar>
        <div className='collectionsection'>
        <Sidebar setAddFirm={handleFirm} setAddProduct={handleProduct} setShowAllProducts={handleAllProducts} showFirmTitle={showFirmTitle}></Sidebar>        
        {showLogin && <Login handlewelcome={handlewelcome}/>}
        {showRegister && <Register handleLogin={handleLogin}/>}
        {showAddFirm && showLogout &&<AddFirm/>}
        {showAddProduct && showLogout && <AddProduct/>}
        {showwelcome && <Welcome/>}
        {showAllProducts && showLogout && <AllProducts/>}
        
          </div>        
    </section>
    </>
  )
}
