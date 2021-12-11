import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

import CourseType from "../types/courseType";

import ICompletedCourses from "../interfaces/iCompletedCourses";

import Courses from "../data/cs_courses.json";
import cs_rotation from "../data/cs_rotation.json";

const CompletedContainer = styled.div`
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
		for (let i = 0; i < Courses.length; ++i) {
			if ((Courses[i].dept === dept) && (Courses[i].num === num)) {
				return Courses[i].name;
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

    return completedData;
  };

  const [formData, setFormData] = useState<CompletedType[]>(generateCompletedData());
  
  

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
    <div className='page-container'>
      <div className="page-header">
        <h1>Completed Courses</h1>
      </div>
      <div className='instructions'>
				<p>Instruction Place Holder</p>
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
      <div className="footer-buttons">
        <button onClick={handleCancel}>Cancel</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default CompletedCourses;