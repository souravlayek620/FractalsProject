import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./upload.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function Upload() {
  const [file,setFile]=useState("");
  const [title,setTitle]=useState("");
  const [decision,setDecison]=useState(false);
  const navigate=useNavigate();

  useEffect(()=>{
    if(file!==""){
      setDecison(true);
    }
    
  },[file])

  const handleGemini=async(e)=>{
    e.preventDefault();
    console.log(file);

    const isLoggedIn = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("loggedIn="));
    const loginname = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("username="));
    
    if (isLoggedIn && isLoggedIn.split("=")[1] === "true") {
      setTitle(loginname.split("=")[1]);
    }
    console.log(loginname.split("=")[1]);

    const formData = new FormData();
    formData.append("title", loginname.split("=")[1]);
    formData.append("file", file);
    console.log(formData);
    try {
      // Send POST request to backend
      const response = await axios.post("http://localhost:5000/api/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (response.status === 200) {
        setTitle("");
        navigate("/share");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    }

  }
  

  return (
    <div className='uploaddiv'>
      <div className='row mx-3 my-3'>
        <div className='col-md-3 detailsinvite'>
          <h4>Campaign Invitation</h4>
          <img src={`https://img.freepik.com/free-photo/tomato-saup-with-basil-bowl_114579-11606.jpg?t=st=1714728954~exp=1714732554~hmac=ed7fec1f51326b85d57fdfd87e91d11497cb5f70456dc5abd008c2ed50b1aa11&w=200`} className='invite'/>
        </div>
        <div className='col-md-1'></div>
        <div className='col-md-8 details'>
          <h6>Black Pepper</h6>
          <p className='my-3'><b>GTIN ID:</b>1002373722</p>
          <p className='detailpara'>
                      <pre className='mt-2'><b>Selected Campaign</b>-Carbon Footprint</pre>
                      <pre><b>Selected Products</b>-Tomato Soup - Zwanenberg,500ml</pre>
                      <pre><b>Selected Frameworks</b>:-</pre>
                      <pre>EUDR: Deforestation Verification</pre>
                      <pre>Product Carbon Footprint - GHGP (Scope 1-3)</pre>
          </p>
          <br />
          <br />
          <br />
          <br />
          <h6 style={{color:'white'}}>Upload Bill of Materials(BOM) with UIDs for each component</h6>
        
        <div className='fileupload'>
        <input type="file" className="form-control" id="file" accept=".xml" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
          {decision?(
          <button className='btn btn-primary my-3' id="custom-button" onClick={handleGemini}>Upload To gemini </button>)
          :
          (<label htmlFor="file" className="btn btn-primary my-3" id="custom-button" style={{ cursor: 'pointer' }}>Upload BOM</label>)}
          
        </div>
        </div>
      </div>
      
    </div>
  )
}

export default Upload;