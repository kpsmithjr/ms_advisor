import React, { useState} from "react";
import { useHistory } from 'react-router-dom';

const semesters = ["FS 21", "SP 22", "FS22", "SP 23"];
const msOptions = ["Traditional",
                   "Professional",
                   "Graduate Certificate in Artificial Intelligence",
                   "Graduate Certificate in Cybersecurity",
                   "Graduate Certificate in Data Science",
                   "Graduate Certificate in Internet and Web",
                   "Graduate Certificate in Mobile Apps and Computing"
                  ];
const credHrs = [3, 6, 9]

const Options =({options, handler})=> {
  const history = useHistory();
  const [formData, setFormData] = useState(options);

  function handleChange(e) {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
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
              Select Your MS Option
            <select
              name="msOption"
              value={formData.msOption}
              onChange={handleChange}
            >
              {msOptions.map((item, i) => { return (<option key={i} value={item}>{item}</option>) })}
            </select>  
            </label>
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
              value={formData.enrollSS}
              onChange={handleChange}
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