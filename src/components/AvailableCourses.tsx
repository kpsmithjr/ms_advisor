import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import CourseCard from "./CourseCard";
import Course from "../types/course";



const Container = styled.div`
	margin: 8px;
	border: 1px solid lighgrey;
	border-radius: 2px;
	width: 360px;
	min-height: 50px;
	overflow-y: scroll;
	height: 600px;
`
const Title = styled.h3`
	padding: 8px;
`
const CourseList = styled.div`
	padding: 8px;
	transition: background-color 0.2s ease;
	flex-grow: 1;
	min-height: 10px;
	display: flex;
	flex-direction: column;
`;
//background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};

interface IAvailableCourses {
	courses: Course[];
	selectedSemYear?: number;
	selectedSemTerm?: string;
}

const AvailableCourses = ({courses}: IAvailableCourses) => {
	const courseRenderer = (courses: Course[]) => (
		<Container>
			<Droppable  droppableId={"AVAILABLE-COURSES"} >
				{(provided, snapshot) => (
					<CourseList
						ref={provided.innerRef}
						{...provided.droppableProps}
						isDraggingOver={snapshot.isDraggingOver}						
					>
						{courses.map((course, index) => (
							<CourseCard key={course.id} course={course} index={index}/>
						))}
					{provided.placeholder}
					</CourseList>											
				)}
			</Droppable>
		</Container>
	)	;	

	return (
		<div>
			<Title>Available Courses</Title>
			{courseRenderer(courses)}
		</div>
	)
}

export default AvailableCourses;