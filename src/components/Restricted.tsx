import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

import IRestricted from "../interfaces/iRestricted";
import CS_Courses from "../data/cs_courses.json";
import MATH_Courses from "../data/math_courses.json";
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
`;

const Restricted = ({restrictedCourses, handler}: IRestricted) => {

	const getCourseName = (dept: string, num:number): string => {
		let Courses;
		if (dept === "CS")	{
			Courses = CS_Courses;
		} else {
			Courses = MATH_Courses;
			
		}
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

	const handleClickCS = (e: any) => {
    const newFormData = csFormData.map(course => {
      if (course.id !== e.target.name ) return course;      
      return { ...course, selected: e.target.checked};
    });
    setCsFormData(newFormData);
		updateGlobal(newFormData, mathFormData);
  }

	const handleClickMath = (e: any) => {
    const newFormData = mathFormData.map(course => {
      if (course.id !== e.target.name ) return course;      
      return { ...course, selected: e.target.checked};
    });
    setMathFormData(newFormData);
		updateGlobal(csFormData, newFormData);
  }

	const handleCancel = () => {
    navigate(-1);
  };

	const updateGlobal = (csData:any, mathData:any) => {
		let newResticted = [] as CourseType[];
		for (let i = 0; i < csData.length; ++i) {
			if (csData[i].selected) {
				const tmp = {
					id: csData[i].id,
					dept: csData[i].dept,
					num: csData[i].num
				}
				newResticted.push(tmp);
			}
		}
		for (let i = 0; i < mathData.length; ++i) {
			if (mathData[i].selected) {
				const tmp = {
					id: mathData[i].id,
					dept: mathData[i].dept,
					num: mathData[i].num
				}
				newResticted.push(tmp);
			}
		}
		handler(newResticted);	
	};

	const handleSubmit = () => {		
		navigate('/transfers');
	}

	return (
		<div className='page-container'>
			<div className="page-header">
        <h1>Restricted Courses</h1>
      </div>
			<div className="footer-buttons">
        <button onClick={handleCancel}>Previous</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={handleSubmit}>Next</button>
      </div>
			<div className='instructions'>
				<p>Restricted courses are those that cover undergraduate level computer science and mathematics skills required in order to proceed with graduate study.</p>
				<p>Please select any courses you have <big><b>NOT</b></big> taken.</p>				
				<br></br>
				<p>Note: These restricted courses should be fulfilled in the first few semesters (optimally in the first semester).</p>
				<p>Note: Credit hours in these courses will not count toward the 30 graduate hour requirement. </p>
				<br></br>
			</div>
			
			<h3>Computer Science Courses</h3>
			<RestrictedContainer>
				{csFormData.map((course, index) => {
          return (
						<div key={`cs-${index}`}>
              <input
                type="checkbox"								
                id={`cs-checkbox-${index}`}
                name={course.id}
                onChange={handleClickCS}
                checked={course.selected}
              />
              <label>  {course.dept} {course.num}: {course.name}</label>
						</div>
          );
      	})
			}
			<br></br>
			</RestrictedContainer>
			<h3>Mathematics Courses</h3>
			<RestrictedContainer>
			{mathFormData.map((course, index) => {
          return (
	          <div key={`math-${index}`}>
              <input
                type="checkbox"
                id={`math-checkbox-${index}`}
                name={course.id}
                onChange={handleClickMath}
                checked={course.selected}
              />
              <label>  {course.dept} {course.num}: {course.name}</label>                 
            </div>  
          );
      	})
			}
			</RestrictedContainer>
	</div>
	);
};

export default Restricted;