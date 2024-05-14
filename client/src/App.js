import { useState } from "react";
import Login from "./Components/Login";
import Select from "./Components/Select";
import Share from "./Components/Share";
import Signup from "./Components/Signup";
import Upload from "./Components/Upload";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Select />
      <Share />
      <Upload />
      <Login />
      <Signup /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/select" element={<Select />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/share" element={<Share />} />
      </Routes>
    </div>
  );
}

export default App;
