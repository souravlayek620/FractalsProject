import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./select.css";
import { useNavigate } from "react-router-dom";

const Select = () => {
  const navigate=useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectMaterial, setSelectMaterial] = useState("");
  const [options, setOptions] = useState([
    { id: 1, name: "Product Carbon Footprint - GHGP (Scope 1-3)",checked:false },
    { id: 2, name: "EUDR: Deforestation Verification",checked:false },
    { id: 3, name: "Labour Risks",checked:false },
  ]);
  const [campaignoptions, setCampainOptions] = useState(["Carbon Footprint", "LifeCycle Assessment/Consequential Analysis", "Waste in Circularity", "Packagings"]);
  const [manufacturerData, setManufacturerData] = useState(null);
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, name: "Greenhouse Gas Protocol-Scope 3 C02e", checked: false },
    { id: 2, name: "EUDR:Deforestation verification", checked: false },
    { id: 3, name: "Labour Risks", checked: false },
  ]);
  const [auditors, setAuditors] = useState(["Impact Buying"]);
  const [materialoptions, setMaterialoptions] = useState(["Tomato Soup - Zwanenberg,500ml"]);
  const [selectCampaign, setSelectCampaign] = useState("");
  const [errorcheck,setErrorCheck]=useState(false);

  useEffect(() => {
    // Simulate fetching manufacturer data and image
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        setManufacturerData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching manufacturer data:", error);
      });

      
  }, []);

  const handleSelectCampaign = (event) => {
    const x = event.target.value;
    setSelectCampaign(event.target.value);
    console.log(x);
  };

  const handleSelectFrameworks = (event) => {
    const selectedOptionId = parseInt(event.target.value);
    const updatedCheckboxes = checkboxes.map((checkbox) => {
      if (checkbox.id === selectedOptionId) {
        return { ...checkbox, checked: !checkbox.checked };
      } else {
        return { ...checkbox};
      }
    });
    setCheckboxes(updatedCheckboxes);
    const opt = options.map((checkbox) => {
      if (checkbox.id === selectedOptionId) {
        return { ...checkbox, checked: !checkbox.checked };
      } else {
        return { ...checkbox};
      }
    });
    setOptions(opt);
  };

  const handleSelectMaterial = (event) => {
    const z = event.target.value;
    setSelectMaterial(event.target.value);
    console.log(z);
  };

  const handleCheckboxChange = (id) => {
    setCheckboxes((prevCheckboxes) => prevCheckboxes.map((checkbox) => (checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox)));
    setOptions((prevOptions) => prevOptions.map((checkbox) => (checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox)));
    let zx = checkboxes;
    console.log(zx);
  };

  const handleNext = (event) => {
    event.preventDefault(); // Prevent form submission
    
    const selectedCheckboxes = checkboxes.filter((checkbox) => checkbox.checked);
    if (selectedCheckboxes.length === 0) {
      setErrorCheck(true);
      setTimeout(() => {
        setErrorCheck(false);
      }, 2000);
    } else {
      navigate("/upload");
      console.log("Proceeding to the next step...");
    }
  };

  return (
    <div className="firstpage">
      <form onSubmit={handleNext}>
        <div className="container-fluid d-block mt-4" style={{ marginTop: "1px", backgroundColor: "#87cefa", padding: "0px", borderRadius: "30px", width: "80%", marginLeft: "10%" }}>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-5">
              <div className="d-flex flex-column  justify-content-center">
                <p className="mb-2 mt-4">Define your new data content and what you need to calculate</p>
                <p className="mb-3 font-weight-bold" style={{ fontSize: "1.5rem" }}>
                  What would you like to calculate?
                </p>

                <p className="mb-2">Select Campaign</p>
                <select value={selectCampaign} onChange={handleSelectCampaign} className="form-control" style={{ fontSize: "14px", maxWidth: "400px", color: "black" }} required>
                  <option value="" selected hidden>
                    Select an Option
                  </option>
                  {campaignoptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <p className="mb-2 mt-2">Choose Product or Material</p>
                <select value={selectMaterial} onChange={handleSelectMaterial} className="form-control" style={{ fontSize: "14px", maxWidth: "400px", color: "black" }} required>
                  <option value="" selected hidden>
                    Select an Option
                  </option>
                  {materialoptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <div className="mt-3">
                  <p className="mb-2">Calculation Frameworks</p>
                  <div className="rounded">
                    <select value={selectedOption} onChange={handleSelectFrameworks} className="form-control" style={{ fontSize: "14px", maxWidth: "400px", color: "black" }}>
                      <option value="" selected hidden>
                        Select an Option
                      </option>
                      {options.map((option) => (
                        <option key={option.id} value={option.id} className={option.checked?"optionbg":""}>
                          {" "}
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  {manufacturerData && (
                    <div className="mt-4 mb-4">
                      <img src={`https://img.freepik.com/free-photo/tomato-saup-with-basil-bowl_114579-11606.jpg?t=st=1714728954~exp=1714732554~hmac=ed7fec1f51326b85d57fdfd87e91d11497cb5f70456dc5abd008c2ed50b1aa11&w=200`} alt="Manufacturer Logo" />
                      <p className="mt-2">Manufacturer: Zwanenberg</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <div className="setModuleheight">
                <div className="bg-white p-4 rounded text-left">
                  <p className="font-weight-bold mb-3">
                    <b>Module</b>
                    <span className="linkclick">imde.io</span>
                  </p>
                  {/* Add the link here*/}
                  <p className="font-weight-bold mb-3">
                    <b>Output</b>
                  </p>
                  {errorcheck && <p style={{color:"red"}} className="ml-2">You need to select any one of the options</p>}
                  {checkboxes.map((checkbox) => (
                    <div key={checkbox.id} className="d-flex justify-content-between form-check mb-3">
                      <label className="form-check-label" htmlFor={`checkbox-${checkbox.id}`}>
                        {checkbox.name}
                      </label>
                      <input className="form-check-input" type="checkbox" checked={checkbox.checked} onChange={() => handleCheckboxChange(checkbox.id)} id={`checkbox-${checkbox.id}`}/>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <p className="mb-2">Choose Auditor</p>
                  <select className="form-control" style={{ width: "100%" }} required>
                    <option value="" selected hidden>
                      Select an Option
                    </option>
                    {auditors.map((auditor) => (
                      <option key={auditor} value={auditor}>
                        {auditor}
                      </option>
                    ))}
                  </select>
                </div>
                <input type="submit" name="submit" value="Next" className="btn btn-primary mt-3" style={{ width: "50%" }} />
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Select;
