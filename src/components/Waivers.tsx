import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Courses from "../data/cs_courses.json";
import styled from "styled-components";
import CourseType from "../types/courseType";
import IWaivers from "../interfaces/iWaivers";

const WaiverContainer = styled.div`
  height: 600px;
  overflow-y: scroll;
`

type WaiverType = {
  id: string;
  dept: string;
  num: number;
  name: string;
  selected: boolean;
};

const Waivers = ({waivers, handler}: IWaivers) => {
  const navigate = useNavigate();
  
  const waiverSelected = (dept: string, num: number) => {
    for (let i = 0; i < waivers.length; ++i) {
      if ((waivers[i].dept === dept) && (waivers[i].num === num)) {
        return true;
      }
    }
    return false;
  };

  const generateWaiverData = () => {
    let arr = [] as WaiverType[];

    for (let i = 0; i < Courses.length; ++i) {
      const waiverData:WaiverType = {
        id: Courses[i].dept + " " + Courses[i].num.toString(),
        dept: Courses[i].dept,
        num: Courses[i].num,
        name: Courses[i].name,
        selected: waiverSelected(Courses[i].dept, Courses[i].num)
      };
      arr.push(waiverData);      
    }
    return arr;
  };
  const [formData, setFormData] = useState<WaiverType[]>(generateWaiverData());
  
  

  function handleClick(e: any) {
    const newFormData = formData.map(course => {
      if (course.id !== e.target.name ) return course;      
      return { ...course, selected: e.target.checked};
    });
    setFormData(newFormData);
  }
  
  function handleCancel() {
    navigate(-1);
  }

  function handleSubmit() {
    let newWaivers = [] as CourseType[];
    for (let i = 0; i < formData.length; ++i) {
      if (formData[i].selected) {
        const waivedCourse:CourseType = {
          id: formData[i].id,
          dept:formData[i].dept,
          num:formData[i].num,
          name:formData[i].name,
        }
        newWaivers.push(waivedCourse);
      }
    }
    handler(newWaivers);
    navigate('/planner');
  }
  
  return (
    <div className='waivers-header'>
      <h1>Input Waivers</h1>
      <WaiverContainer>
        {formData.map((course, index) => {
          return (
            <li key={index}>
              <div >
                <div >
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={course.id}
                    onChange={handleClick}
                    checked={course.selected}
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