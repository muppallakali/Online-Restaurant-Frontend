import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import "./App.css"
import { Routes,Route} from "react-router-dom";
import NotFoundPage from './vendorDashboard/components/forms/NotFoundPage';
export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage></LandingPage>}> 
      <Route path='/*' element={<NotFoundPage/>}></Route>   
      </Route>
    </Routes>
    
    </>
  )
}
