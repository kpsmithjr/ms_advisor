import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import CourseCard from "./CourseCard";

import SemItem from "../types/semItem";

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgray;
	border-radius: 2px;
	width: 300px;
	min-height: 100px;
`
const Title = styled.h3`
	padding: 8px;
`
const CourseList = styled.div`
	padding: 8px;
	transition: background-color 0.2s ease;
	background-color: ${props => (props.isDraggingOver ? 'green' : 'white')};
	min-height: 115px;
	display: flex;
	flex-direction: column;
`;

const Semester = ({sem}: {sem: SemItem}) => {

	return (
		<Container>
			<Title>{sem.id}</Title>
			<Droppable 
				droppableId={sem.id}
			>
				{(provided, snapshot) => (
					<CourseList
						ref={provided.innerRef}
						{...provided.droppableProps}
						isDraggingOver={snapshot.isDraggingOver}
					>
						{sem.courses.map((course, index) => (
							<CourseCard key={course.id} course={course} index={index}/>
						))}
						{provided.placeholder}
					</CourseList>											
				)}
			</Droppable>
		</Container>
	)
}

export default Semester;