import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import CourseCard from "./CourseCard";

import Course from "../types/courseType";

import IAvailableCourses from "../interfaces/iAvailableCourses";

import cs_rotation from "../data/cs_rotation.json";
import SelectedSemester from "../types/selectedSemester";

const OuterContainer = styled.div`
	text-align: center;
`;

const Container = styled.div`
	margin: 8px;
	border: 1px solid lighgrey;
	border-radius: 2px;
	width: 360px;
	min-height: 50px;
	overflow-y: scroll;
	height: 600px;
	text-align: center;
`;

const Title = styled.h3`
	padding: 8px;
	text-align: center;
`;

const CourseList = styled.div`
	padding: 8px;
	transition: background-color 0.2s ease;
	flex-grow: 1;
	min-height: 10px;
	display: flex;
	flex-direction: column;
`;



const AvailableCourses = ({courses, selectedSemester}: IAvailableCourses) => {
	
	const filterYearTerm = (course: Course[], selSem:SelectedSemester):Course[] => {
		if ((selSem.term === "") && (selSem.year === 0)) {
			return course;
		}

		let output = [] as Course[];
		// Loop through all courses
		for (let i = 0; i < course.length; ++i) {
			let cs_rot_entry:any = null;

			// Find the course in the cs rotation
			for (let j = 0; j < cs_rotation.length; ++j) {
				// Check if the j-th entry in the cs rotation matches the i-th course
				if ((cs_rotation[j].dept === course[i].dept) && (cs_rotation[j].num === course[i].num)) {
					cs_rot_entry = cs_rotation[j];
					break;
				}
			}
		
			if (cs_rot_entry === null) {
				console.error("Could not find course in CS rotation");
			} else {
				// Check if the j-th course is offered in the selected year
				if (((selSem.year % 2 === 0) && cs_rot_entry.evenYr) || ((selSem.year % 2 === 1) && cs_rot_entry.oddYr)) {
					// Check if the i-th course is offered in the selected term
					if (((selSem.term === "SP") && cs_rot_entry.springSem) ||
							((selSem.term === "SS") && cs_rot_entry.summerSem) ||
							((selSem.term === "FS") && cs_rot_entry.fallSem)) {	
						output.push(course[i]);
					}
				}
			}			
		}
		
		return output;
	};


	const courseRenderer = (courses: Course[]) => (
		<Container>
			<Droppable  droppableId={"AVAILABLE-COURSES"} >
				{(provided, snapshot) => (
					<CourseList
						ref={provided.innerRef}
						{...provided.droppableProps}				
					>
						{courses.map((course, index) => (
							<CourseCard key={course.id} course={course} index={index} preReqNotMet={false}/>
						))}
					{provided.placeholder}
					</CourseList>											
				)}
			</Droppable>
		</Container>
	);	

	return (
		<OuterContainer>
			<Title>Available Courses</Title>
			<p>(Double-click for descriptions)</p>
			{courseRenderer(filterYearTerm(courses, selectedSemester))}
		</OuterContainer>
	)
}

export default AvailableCourses;