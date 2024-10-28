import React,{useState} from 'react'
import {API_Path} from "../../data/apiPath"

export default function AddFirm() {
  let [firmName,SetFirmName]=useState("")
  let [area,Setarea]=useState("")
  let [category,Setcategory]=useState([])
  let [region,Setregion]=useState([])
  let [offer,Setoffer]=useState("")
  let [file,Setfile]=useState(null)
   function handlecategory(e){
    const value=e.target.value
    if(category.includes(value)){
      Setcategory(category.filter((item)=>item !==value))
    }
    else{
      Setcategory([...category,value])
    }
  }
   function handleregion(e){
    const value=e.target.value
    if(region.includes(value)){
      Setregion(region.filter((item)=>item !==value))
    }
    else{
      Setregion([...region,value])
    }
  }
  async function handlefirmsubmit(e){
    e.preventDefault()
    try{
      let logintoken=localStorage.getItem("loginToken")
      if(!logintoken){console.log("token not found r user not foud")}
      let formData=new FormData()
      formData.append("firmName",firmName)
      formData.append("area",area)
      formData.append("offer",offer)
      formData.append("image",file)
      category.forEach((value)=>{
        formData.append("category",value)
      })
      region.forEach((value)=>{
        formData.append("region",value)
      })
      const res=await fetch(`${API_Path}/firm/add-firm`,{method:"POST",
        headers:{"token":`${logintoken}`},
        body:formData
      })
            
      const data=await res.json()
      if(res.ok){
        console.log(data)
        alert("Firm Added Successfully")
        SetFirmName("")
        Setarea('')
        Setcategory([])
        Setregion([])
        Setoffer("")
        Setfile(null)
      }
      else if(data.message==="vendor can have only one firm"){
        alert("Firm Exists. Only one firm can be added")
      }
      else{
        alert("Failed to add firm")
      }
      console.log( "this is firm id",data.firmId)
      const firmId=data.firmId;
      localStorage.setItem("firmId",firmId)
    }
    
    catch(error){
      console.log(error)
      alert("Failed to add Firm")
    }
  }
  function handleimgupload(e){
    const selectedImage=e.target.files[0]
    Setfile(selectedImage)
  }
  return (
    <div className="addfirm">
        <h3>Add Firm</h3>
        <form action="" className='addfirmform' onSubmit={handlefirmsubmit}>
            <label htmlFor="firmname">Firm Name</label>
            <input type="text" name="firmName" id='firmname' value={firmName} onChange={(e)=>SetFirmName(e.target.value)} required />
            <label htmlFor="area">Area</label>
            <input type="text" name="area" id='area' value={area} onChange={(e)=>Setarea(e.target.value)}  required />
           <div className="check_inp">
          <label htmlFor="" className='catLabel'>Category: </label>
          <div className="checkboxContainer">
            <label htmlFor="">Veg</label>
            <input type="checkbox" checked={category.includes("veg")} value="veg" onChange={handlecategory} />            
          </div>
          <div className="checkboxContainer">
          <label htmlFor="">Non-Veg</label>
          <input type="checkbox" checked={category.includes("non-veg")} value="non-veg" onChange={handlecategory}/>
          </div>          
        </div>            
             <div className="check_inp">
          <label htmlFor="" className='catLabel'>Region: </label>
          <div className="checkboxContainer">
            <label htmlFor="">South-Indian</label>
            <input type="checkbox" value="south-indian" checked={region.includes("south-indian")} onChange={handleregion} />            
          </div>
          <div className="checkboxContainer">
          <label htmlFor="">North-Indian</label>
          <input type="checkbox" value="north-indian" checked={region.includes("north-indian")} onChange={handleregion}/>
          </div>  
          <div className="checkboxContainer">
          <label htmlFor="">Chainese</label>
          <input type="checkbox" value="chainese" checked={region.includes("chainese")}onChange={handleregion}/>
          </div>         
        </div>
            <label htmlFor="offer">Offer</label>
            <input type="text" id='offer'name='offer' value={offer} onChange={(e)=>Setoffer(e.target.value)} required />
            <label htmlFor="image" >Image</label>
            <input type="file" id='image' name="image" onChange={handleimgupload} required /> 
            <center className="submit">
            <button type='submit'>Submit</button>
        </center>
        </form>
        
    </div>
  )
}
