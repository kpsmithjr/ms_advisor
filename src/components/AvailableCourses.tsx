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



const AvailableCourses = ({courses}: IAvailableCourses) => {
		
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
			{courseRenderer(courses)}
		</OuterContainer>
	)
}

export default AvailableCourses;