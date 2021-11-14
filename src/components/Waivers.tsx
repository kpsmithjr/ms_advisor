import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Courses from "../data/cs_courses.json";
import styled from "styled-components";

const WaiverContainer = styled.div`
  height: 600px;
  overflow-y: scroll;
`

const Waivers = ({waivers, handler}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(waivers);

  function handleClick(e) {
    let newformData = formData;
    if (newformData.includes(e.target.name)) {
      newformData = newformData.filter(element => element !== e.target.name);
    } else {
      newformData.push(e.target.name);
    }    
    setFormData(newformData);
  }

  function containsCourse(name) {
    return formData.includes(name);
  }

  function handleCancel() {
    navigate(-1);
  }

  function handleSubmit() {
    handler(formData);
    navigate('/planner');
  }

  return (
    <div className='waivers-header'>
      <h1>Input Waivers</h1>
      <WaiverContainer>
        {Courses.map(( course, index) => {
          return (
            <li key={index}>
              <div >
                <div >
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={course.dept+ " " + course.num}
                    onChange={handleClick}
                    checked={containsCourse(course.dept+ " " + course.num)}
                  />
                  <label>{course.dept} {course.num}: {course.name}</label>                 
                </div>
              </div>
            </li>
          );
        })}
      </WaiverContainer>      
    <button onClick={handleCancel}>Cancel</button>
    <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Waivers;