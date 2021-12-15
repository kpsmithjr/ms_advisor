import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

import CourseType from "../types/courseType";

import ICompletedCourses from "../interfaces/iCompletedCourses";

import cs_courses from "../data/cs_courses.json";
import math_courses from "../data/math_courses.json";
import cs_rotation from "../data/cs_rotation.json";
import track_reqs from "../data/track_req.json";

const CompletedContainer = styled.div`
min-height: 50px;
overflow-y: scroll;
height: 600px;
overflow-y: scroll;
`;

type CompletedType = {
  id: string;
  dept: string;
  num: number;
  name: string;
  selected: boolean;
};

const CompletedCourses = ({completed, msTrack, handler}: ICompletedCourses) => {
  const navigate = useNavigate();
  
  const completedSelected = (dept: string, num: number): boolean => {
    for (let i = 0; i < completed.length; ++i) {
      if ((completed[i].dept === dept) && (completed[i].num === num)) {
        return true;
      }
    }
    return false;
  };

  const getCourseName = (dept: string, num:number): string => {
    let courses;
    if (dept === "CS") {
      courses = cs_courses;
    } else if (dept === "MATH") {
      courses = math_courses;
    } else {
      return "";
    }
		for (let i = 0; i < courses.length; ++i) {
			if ((courses[i].dept === dept) && (courses[i].num === num)) {
				return courses[i].name;
			}
		}
		return "";
	};

  const isCompletedInArray = (completed: CompletedType, arr: CompletedType[]): boolean => {
    for (let i = 0; i < arr.length; ++i) {
      if ((completed.dept === arr[i].dept) && (completed.num === arr[i].num)) {
        return true;
      }
    }
    return false;
  };

  const generateCompletedData = (): CompletedType[] => {
    let optReq: any;
    let track_found = false;
    for (let i = 0; i < track_reqs.length; ++i) {
      if (msTrack === track_reqs[i].name) {
        optReq = track_reqs[i];
        console.log(optReq);
        track_found = true;
        break;
      }
    }
  
    if (!track_found) {
      console.log(msTrack);
      console.error("Unknown Track");
    }

    let completedData = [] as CompletedType[];

    for (let i=0; i < cs_rotation.length; ++i) {      
      if (cs_rotation[i].num >= 4000) {
        const newCompleted:CompletedType = {
          id: cs_rotation[i].dept + " " + cs_rotation[i].num.toString(),
          dept: cs_rotation[i].dept,
          num: cs_rotation[i].num,
          name: getCourseName(cs_rotation[i].dept, cs_rotation[i].num),
          selected: completedSelected(cs_rotation[i].dept, cs_rotation[i].num)
        };  
        completedData.push(newCompleted)
      }   
    }

    if (optReq !== null) {
      for (let i = 0; i < optReq.required.length; ++i) {
        for (let j = 0; j < optReq.required[i].courses.length; ++j) {
          if (optReq.required[i].courses[j].dept === "MATH") {
            const dept:string = optReq.required[i].courses[j].dept;
            const num:number = optReq.required[i].courses[j].num;					
            const newCompleted:CompletedType = {
              id:  dept + " " + num.toString(),
              dept: dept,
              num: num,
              name: getCourseName(dept, num),
              selected: completedSelected(dept, num)
            };
            completedData.push(newCompleted)
          }
        }
      }
      for (let i = 0; i < optReq.electives.length; ++i) {
        for (let j = 0; j < optReq.electives[i].courses.length; ++j) {
          if (optReq.electives[i].courses[j].dept === "MATH") {
            const dept:string = optReq.electives[i].courses[j].dept;
            const num:number = optReq.electives[i].courses[j].num;					
            const newCompleted:CompletedType = {
              id:  dept + " " + num.toString(),
              dept: dept,
              num: num,
              name: getCourseName(dept, num),
              selected: completedSelected(dept, num)
            };
            completedData.push(newCompleted)
          }
        }
      }
    }
    return completedData;
  };

  const [formData, setFormData] = useState<CompletedType[]>(generateCompletedData());
  
  

  function handleClick(e: any) {
    const newFormData = formData.map(course => {
      if (course.id !== e.target.name ) return course;      
      return { ...course, selected: e.target.checked};
    });
    setFormData(newFormData);

    let newWaivers = [] as CourseType[];
    for (let i = 0; i < newFormData.length; ++i) {
      if (newFormData[i].selected) {
        const waivedCourse:CourseType = {
          id: newFormData[i].id,
          dept:newFormData[i].dept,
          num:newFormData[i].num,
          name:newFormData[i].name,
        }
        newWaivers.push(waivedCourse);
      }
    }
    handler(newWaivers);
  }
  
  function handleCancel() {
    navigate(-1);
  }

  function handleSubmit() {
    navigate('/planner');
  }
  
  return (
    <div className='page-container'>
      <div className="page-header">
        <h1>Completed Courses</h1>
      </div>
      <div className="footer-buttons">
        <button onClick={handleCancel}>Previous</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={handleSubmit}>Next</button>
      </div>
      <div className='instructions'>
				<p>Select any course you have completed while in the MS program in Computer Science at UMSL.</p>
        <br>
        </br>
			</div>
      <CompletedContainer>
        {formData.map((course, index) => {
          return (
            <div key={`completed-checkbox-${index}`}>
              <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                name={course.id}
                onChange={handleClick}
                checked={course.selected}
              />
              <label>  {course.dept} {course.num}: {course.name}</label>                 
            </div>
          );
        })}
      </CompletedContainer>
    </div>
  );
}

export default CompletedCourses;