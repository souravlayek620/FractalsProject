import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./share.css";

const Share = () => {
  const [campaignRequestCheckboxes, setCampaignRequestCheckboxes] = useState([
    { id: 20389755, name: "Ahold Delhaize", parameters: "Scope 3,EUDR", checked: true },
    { id: 30877756, name: "Spar", parameters: "Scope 3", checked: true },
  ]);
  const [alcal, setAlCal] = useState(true);
  const [shmarketplace, setShMarketPlace] = useState(true);

  useEffect(() => {}, []);

  const handleCheckboxChange = (id) => {
    setCampaignRequestCheckboxes((prevCheckboxes) => prevCheckboxes.map((checkbox) => (checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox)));
    let zx = campaignRequestCheckboxes;
    console.log(zx);
  };

  const handleCheckboxCal = (ini) => {
    setAlCal(!ini);
  };

  const handleCheckboxshmp = (ini) => {
    setShMarketPlace(!ini);
  };

  return (
    <div className="firstpage">
      <div className="container-fluid d-block mt-4" style={{ marginTop: "1px", backgroundColor: "#87cefa", padding: "0px", borderRadius: "30px", width: "80%", marginLeft: "10%" }}>
        <div className="row">
          <div className="col-md-1"></div>

          <div className="col-md-4">
            <h3 className="mt-4">Share calculated data</h3>
            <p className="font-weight-bold mb-3">Choose where to share data</p>
            <div className="bg-white p-4 mb-3 rounded text-left">
              <div className="mt-4 mb-4">
                <img src={`https://img.freepik.com/free-photo/tomato-saup-with-basil-bowl_114579-11606.jpg?t=st=1714728954~exp=1714732554~hmac=ed7fec1f51326b85d57fdfd87e91d11497cb5f70456dc5abd008c2ed50b1aa11&w=220`} alt="Manufacturer Logo" />
                <p className="mt-2">
                  <b>Campaign ID:</b> 10235900
                </p>
                <p>Results</p>
                <p className="mt-2">
                  <b>5.03kg C02e/kg</b> (GHCP)
                </p>
                <p>
                  Supply Chain <a href="https://google.com"> Map</a>
                </p>
                <a href="https://google.com">Auditor Attestation </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="setModule">
              <div className="bg-white p-4 rounded text-left">
                <p className="font-weight-bold mb-3 linkclick">Company Data Vault</p>
                <p className="font-weight-bold mb-3">
                  Zwanenberg_Fractals<span className="urlcheck">url:19xcf.fractals</span>
                </p>
                <div className="d-flex justify-content-between">
                  <label for="alcd">Allow others to calculate on this data?</label>
                  <input className="form-check-input" type="checkbox" checked={alcal} onChange={() => handleCheckboxCal(alcal)} id="alcd" />
                </div>

                <p className="font-weight-bold mb-3 linkclick">External</p>
                <p className="font-weight-bold mb-3">
                  Campaign Requests
                  <ul>
                    {campaignRequestCheckboxes.map((checkbox) => (
                      <li key={checkbox.id}>
                        <div key={checkbox.id} className="d-flex justify-content-between mb-3 ml-0">
                          <label className="form-check-label" htmlFor={`checkbox-${checkbox.id}`}>
                            ID : <b>{checkbox.id}</b> {checkbox.name} {checkbox.parameters}
                          </label>

                          <input className="form-check-input" type="checkbox" checked={checkbox.checked} onChange={() => handleCheckboxChange(checkbox.id)} id={`checkbox-${checkbox.id}`} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </p>
                <p className="font-weight-bold mb-3 linkclickpd">Product Data Marketplace</p>
                <div className="d-flex justify-content-between">
                  <label htmlFor="shmp">Allow others to calculate on this data?</label>
                  <input className="form-check-input" type="checkbox" checked={shmarketplace} onChange={() => handleCheckboxshmp(shmarketplace)} id="shmp" />
                </div>
              </div>
              <button className="btn btn-primary mt-3 sharebtn">Share</button>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Share;
