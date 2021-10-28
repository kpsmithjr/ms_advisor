import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

const semesters = [
  "FS 21",
  "SP 22",
  "FS22",
  "SP 23"
];
const msTracks = [
  "Traditional",
  "Professional",
  "Graduate Certificate"
];


const credHrs = [3, 6, 9]

const Options =({options, handler})=> {
  const history = useHistory();
  const [formData, setFormData] = useState(options);

  function handleChange(e) {
    return setFormData({ ...formData, [e.target.name]: [e.target.value] });
  }

  function handelCheckChange(e) {
    return setFormData({ ...formData, [e.target.name]: e.target.checked });
  }

  function handleCertChange(e) {
    const newCerts = formData.certs.map(cert => {
      if (cert.name !== e.target.name ) return cert;      
      return { ...cert, selected: e.target.checked};
    });
    setFormData({ ...formData, certs: newCerts});
  }

  function handleSubmit() {
    handler(formData);
    history.push('/waivers');
  }

  function handleCancel() {
    history.goBack();
  }

  return (   
    <div>
      <div className="options-header">
      <h1>Select Academic Plan Options</h1>
      </div>
        <div className="options-form">
          <form>        
            <label>
              Select Your First Semester
              <select
                name="firstSem"
                value={formData.firstSem}
                onChange={handleChange}
              >
                {semesters.map((item, i) => { return (<option key={i} value={item}>{item}</option>) })}
              </select>
            </label>
            <br />
            <br />
            <label>
              Select Your MS Track
            <select
              name="msTrack"
              value={formData.msTrack}
              onChange={handleChange}
            >
              {msTracks.map((item, i) => { return (<option key={i} value={item}>{item}</option>) })}
            </select>
            </label>
            <br />
            <br />
            
            Graduate Certificate: 
            {formData.certs.map(( cert, index) => {
              return (
                <li key={index}>
                  <div >
                    <div >
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={cert.name}
                        checked={cert.selected}
                        onChange={handleCertChange}
                      />
                      <label>{cert.name}</label>                 
                    </div>
                  </div>
                </li>
              );
            })}
            <br />
            <br />
            <label>
              Maximum Credit Hours per Semester                    
              <select
                name="maxCredHrs"
                value={formData.maxCredHrs}
                onChange={handleChange}
              >
               {credHrs.map((item, i) => { return (<option key={i} value={item}>{item}</option>) })}
              </select>
            </label>
            <br />
            <br />
            <label>
            Enroll in Summer Courses
            <input
              name="enrollSS"
              type="checkbox"
              checked={formData.enrollSS}
              onChange={handelCheckChange}
            />
            </label>
            <br />
            <br />
          </form>
        </div>
        <div className="options-footer">
          <button onClick={handleCancel}>Cancel</button>
          {/*<button onClick={() => handler(formData)}>Next</button>*/}
          <button onClick={handleSubmit}>Next</button>
        </div>
      </div>
    );
  }

export default Options;


/*
<select
                name="msOption"
                value={formData.msOption}
                onChange={handleChange}
              >
                <option value="--"> -- </option>
                <option value="Traditional">Traditional</option>
                <option value="Professional">Professional</option>
                <option value="Certificate">Certificate</option>            
              </select>
*/