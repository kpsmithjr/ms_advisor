import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

import IRestricted from "../interfaces/iRestricted";
import Courses from "../data/cs_courses.json";
import RestrictedCourses from "../data/restricted.json";
import CourseType from '../types/courseType';

type RestrictedCourseType = {
	id: string;
	dept: string;
	num: number;
	name: string;
	selected: boolean;
};

const RestrictedContainer = styled.div`
`

const Restricted = ({restrictedCourses, handler}: IRestricted) => {

	const getCourseName = (dept: string, num:number): string => {
		for (let i = 0; i < Courses.length; ++i) {
			if ((Courses[i].dept === dept) && (Courses[i].num === num)) {
				return Courses[i].name;
			}
		}
		return "";
	};

	const isCourseSelected = (dept: string, num: number): boolean => {
		for (let i = 0; i < restrictedCourses.length; ++i) {
			if ((restrictedCourses[i].dept === dept) && (restrictedCourses[i].num === num)) {
				return true;
			}
		}		
		return false;
	}

	const initializeFormData = (dept: string): RestrictedCourseType[] => {
		let arr = [] as RestrictedCourseType[];

		for (let i = 0; i < RestrictedCourses.length; ++i) {
			if (RestrictedCourses[i].dept === dept) {
				const waiverData:RestrictedCourseType = {
					id: RestrictedCourses[i].dept + " " + RestrictedCourses[i].num.toString(),
        	dept: RestrictedCourses[i].dept,
        	num: RestrictedCourses[i].num,
        	name: getCourseName(RestrictedCourses[i].dept, RestrictedCourses[i].num),
        	selected: isCourseSelected(RestrictedCourses[i].dept, RestrictedCourses[i].num)
      	};
				arr.push(waiverData);
			}      
		}
		return arr;
	};

	const navigate = useNavigate();
	const [csFormData, setCsFormData] = React.useState<RestrictedCourseType[]>(initializeFormData("CS"));
	const [mathFormData, setMathFormData] = React.useState<RestrictedCourseType[]>(initializeFormData("MATH"));

	function handleClickCS(e: any) {
    const newFormData = csFormData.map(course => {
      if (course.id !== e.target.name ) return course;      
      return { ...course, selected: e.target.checked};
    });
    setCsFormData(newFormData);
  }
	function handleClickMath(e: any) {
    const newFormData = mathFormData.map(course => {
      if (course.id !== e.target.name ) return course;      
      return { ...course, selected: e.target.checked};
    });
    setMathFormData(newFormData);
  }

	const handleCancel = () => {
    navigate(-1);
  };

	const handleSubmit = () => {
		let newResticted = [] as CourseType[];
		for (let i = 0; i < csFormData.length; ++i) {
			if (csFormData[i].selected) {
				const tmp = {
					id: csFormData[i].id,
					dept: csFormData[i].dept,
					num: csFormData[i].num
				}
				newResticted.push(tmp);
			}
		}
		for (let i = 0; i < mathFormData.length; ++i) {
			if (mathFormData[i].selected) {
				const tmp = {
					id: mathFormData[i].id,
					dept: mathFormData[i].dept,
					num: mathFormData[i].num
				}
				newResticted.push(tmp);
			}
		}
		handler(newResticted);
		navigate('/transfers');
	}

	return (
		<div>
			<p>Instruction Place Holder</p>
			<h2>Computer Science Courses</h2>			
			<RestrictedContainer>
			{csFormData.map((course, index) => {
          return (
            <li key={index}>
              <div >
                <div >
                  <input
                    type="checkbox"
                    id={`cs-checkbox-${index}`}
                    name={course.id}
                    onChange={handleClickCS}
                    checked={course.selected}
                  />
                  <label>{course.dept} {course.num}: {course.name}</label>                 
                </div>
              </div>
            </li>
          );
      	})
			}
			</RestrictedContainer>
			<h2>Mathmatic Courses</h2>
			<RestrictedContainer>
			{mathFormData.map((course, index) => {
          return (
            <li key={index}>
              <div >
                <div >
                  <input
                    type="checkbox"
                    id={`math-checkbox-${index}`}
                    name={course.id}
                    onChange={handleClickMath}
                    checked={course.selected}
                  />
                  <label>{course.dept} {course.num}: {course.name}</label>                 
                </div>
              </div>
            </li>
          );
      	})
			}
			</RestrictedContainer>
			<div className="options-footer">
				<button onClick={handleCancel}>Cancel</button>
			<button onClick={handleSubmit}>Next</button>
			</div>
	</div>
	);
};

export default Restricted;