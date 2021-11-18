import styled from "styled-components";
import { Draggable} from "react-beautiful-dnd";

import Course from "../types/course";

const Container = styled.div`
	background-color: ${props => (props.isDragging ? 'lightgrey' : (props.isAvailable ? 'lightgreen' : 'white'))};
	border: 1px solid black;
	border-radius: 8px;
	padding: 2px;
	margin-right: 8px;
`

interface ICourseCard {
	course: Course;
	index: number;
}

const CourseCard = ({course, index}: ICourseCard) => {
	return (
		<Draggable
			draggableId={course.id}
			index={index}
			key={course.id}
		>
			{(provided, snapshot) => (
				<Container
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}
					isAvailable={false}
				>
					{course.id  + " - " + course.name}
				</Container>
			)}			
		</Draggable>		
	);
}

export default CourseCard;