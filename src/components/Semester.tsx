import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import CourseCard from "./CourseCard";

import SemItem from "../types/semItemType";

import cs_rotation from "../data/cs_rotation.json";

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgray;
	border-radius: 2px;
	width: 360px;
	min-height: 100px;
`
const Title = styled.h3`
	padding: 8px;
`
interface ICourseList {
	isDropDisabled: boolean;
	isDraggingOver: boolean;
};

const CourseList = styled.div<ICourseList>`
	padding: 8px;
	transition: background-color 0.2s ease;
	background-color: ${props => (props.isDropDisabled ? 'lightgrey' : props.isDraggingOver ? 'skyblue' : 'white')};
	min-height: 115px;
	display: flex;
	flex-direction: column;
`;

const Semester = ({sem, courseId}: {sem: SemItem, courseId: string}) => {
	
	const courseOffered = () => {
		if (courseId === "") {
			return true;
		}
		
		for (let i = 0; i < cs_rotation.length; ++i) {
			if (courseId === (cs_rotation[i].dept + " " + cs_rotation[i].num.toString())) {
				
				// Check that the course is offered in this current semester
				if (((sem.term === "SP") && !cs_rotation[i].springSem) ||
						((sem.term === "SS") && !cs_rotation[i].summerSem) ||
						((sem.term === "FS") && !cs_rotation[i].fallSem)) {
					return false;					
				}

				if (((sem.year % 2 === 0) && !cs_rotation[i].evenYr) || 
						((sem.year % 2 === 1) && !cs_rotation[i].oddYr)) {
					return false;
				}
				
				return true;				
			}
		}
		return false;
	};

	return (
		<Container>
			<Title>{sem.id}</Title>
			{/*<button>{sem.id}</button>*/}
			<Droppable 
				droppableId={sem.id}
				isDropDisabled={!courseOffered()}
			>
				{(provided, snapshot) => (
					<CourseList
						ref={provided.innerRef}
						{...provided.droppableProps}
						isDraggingOver={snapshot.isDraggingOver}
						isDropDisabled={!courseOffered()}
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