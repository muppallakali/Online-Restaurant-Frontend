import React,{useState} from 'react'
import {API_Path} from "../../data/apiPath"

export default function AddProduct() {
  let[productName,setProductname]=useState("")
  let[price,setPrice]=useState("")
  let [category,setCategory]=useState([])
  let[bestSeller,setbestSeller]=useState(false)
  let[image,setimage]=useState(null)
  let[description,setdescp]=useState("")

  function handleimgupload(e){
    const selectedImage=e.target.files[0]
    setimage(selectedImage)
  }

  async function handlecategory(e){
    const value=e.target.value
    if(category.includes(value)){
      setCategory(category.filter((item)=>item !==value))
    }
    else{
      setCategory([...category,value])
    }
  }
  function handleBestSeller(e){
    const value=e.target.value==="true"
    setbestSeller(value)
  }
  async function handleProduct(e) {
    e.preventDefault()
    try{
      let logintoken=localStorage.getItem("loginToken")
      const firmId=localStorage.getItem("firmId")
      if(!logintoken || !firmId){
        console.log("user not authanticated")
      }
      let formData=new FormData()
      formData.append("productName",productName)
      formData.append("price",price)
      formData.append("description",description)
      formData.append("image",image)
      formData.append("bestSeller", bestSeller);
      category.forEach((value)=>{
        formData.append("category",value)
      })
      const res=await fetch(`${API_Path}/product/add-product/${firmId}`,{
        method:"POST",        
        body:formData
      })
      let data=await res.json()
      if(res.ok){
        alert("Product Added Successfully")
      }
      console.log(data)
      console.log( "this is firm id",firmId)
      setProductname("")
      setPrice("")
      setCategory([])
      setbestSeller(false)
      setdescp("")
      setimage(null)
    }
    catch(error){
      console.log(error.message)
      alert("Failed To Add Product")
    }
  }

  return (
    <div className="addfirm">
    <h3>Add Product</h3>
    <form onSubmit={handleProduct} className='addfirmform'>
        <label htmlFor="productName">Product Name</label>
        <input type="text" id='productName' value={productName} onChange={(e)=>setProductname(e.target.value)} required />
        <label htmlFor="price">Price</label>
        <input type="text" id='price' value={price} onChange={(e)=>setPrice(e.target.value)} required />
        
        <div className="check_inp">
          <label htmlFor="" className='catLabel'>Category: </label>
          <div className="checkboxContainer">
            <label htmlFor="">Veg</label>
            <input type="checkbox" value="veg" checked={category.includes("veg")} onChange={handlecategory}/>            
          </div>
          <div className="checkboxContainer">
          <label htmlFor="">Non-Veg</label>
          <input type="checkbox" value="non-veg" checked={category.includes("non-veg")} onChange={handlecategory}/>
          </div>          
        </div>
        
         <div className="check_inp">
          <label htmlFor="" className='catLabel'>Best Seller: </label>
          <div className="checkboxContainer">
            <label htmlFor="">Yes</label>
            <input type="radio" value="true" checked={bestSeller === true}  onChange={handleBestSeller} />            
          </div>
          <div className="checkboxContainer">
          <label htmlFor="">No</label>
          <input type="radio" value="false" checked={bestSeller === false} onChange={handleBestSeller} />
          </div>          
        </div>
        <label htmlFor="description">Description</label>
        <input type="text" id='description' value={description} onChange={(e)=>setdescp(e.target.value)} required />
        <label htmlFor="image">Image</label>
        <input type="file" id='image' onChange={handleimgupload} required /> 
        <center className="submit">
        <button type='submit'>Submit</button>
    </center>        
    </form>
    
</div>
  )
}
