import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Courses from "./cs_courses.json";

/*
    var test = formData;
    if (test.length > 0) {
      if (test.includes(e.target.name)) {
        test = test.filter(element => element !== e.target.name);
      } else {
        test.push(e.target.name);
      }

    } else {
      test.push(e.target.name);
    }
    console.log(test);
    setFormData(test);
*/
const Waivers =({waivers, hanlder})=> {
  const history = useHistory();
  const [formData, setFormData] = useState(waivers);

  function handleClick(e) {
    let newformData = formData;
    if (newformData.includes(e.target.name)) {
      newformData = newformData.filter(element => element !== e.target.name);
    } else {
      newformData.push(e.target.name);
    }    
    setFormData(newformData);
    console.log(formData);
  }

  function containsCourse(name) {
    console.log(formData.includes(name));
    return formData.includes(name);
  }

  function handleCancel() {
    history.goBack();
  }

  function handleSubmit() {
    hanlder(formData);
    history.push('/plan');
  }

  return (
    <div className='waivers-header'>
      <h1>Input Waivers</h1>
        {Courses.map(( course, index) => {
          return (
            <li key={index}>
              <div >
                <div >
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={course.dept+ " " + course.course_num}
                    onChange={handleClick}
                    checked={containsCourse(course.dept+ " " + course.course_num)}
                  />
                  <label>{course.dept} {course.course_num}: {course.name}</label>                 
                </div>
              </div>
            </li>
        );
      })}
    <button onClick={handleCancel}>Cancel</button>
    <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Waivers;