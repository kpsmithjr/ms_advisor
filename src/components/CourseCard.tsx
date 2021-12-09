import styled from "styled-components";
import { Draggable} from "react-beautiful-dnd";

import Course from "../types/courseType";
import cs_courses from "../data/cs_courses.json"

interface StyledDivProps {
	isDragging: boolean;
	isAvailable: boolean;
	preReqNotMet: boolean;
}

const Container = styled.div<StyledDivProps>`
	background-color: ${props => (props.preReqNotMet ? 'red': props.isDragging ? 'lightgrey' : (props.isAvailable ? 'lightgreen' : 'white'))};
	border: 1px solid black;
	border-radius: 8px;
	padding: 2px;
	margin-right: 8px;
`

interface ICourseCard {
	course: Course;
	index: number;
	preReqNotMet: boolean;
}

const getCourseIdx = (dept: string, num: number) => {
	for (let i = 0; i < cs_courses.length; ++i) {
		if ((cs_courses[i].dept === dept) && (cs_courses[i].num === num)) {
			return i;
		}
	}
	return -1;
};

//The description is based on the course container id's being set to dept,num csv string in CourseCard below
//TODO: is it better to show the description on mouseenter? or onclick, followed by hiding ondrag + onmouseup?
const showDescription = (event: any) => {
	const dept = event.target.id.split(",")[0];
	const num = parseInt(event.target.id.split(",")[1]);
	var courseIdx = getCourseIdx(dept, num);
	//console.log(event.target);
	//console.dir(event.target);
	if (courseIdx >= 0) {
		var newStr = event.target.textContent += "\n\n" + cs_courses[courseIdx].description;
		event.target.textContent = newStr;
		event.target.innerHTML = newStr.replace(/\r/g, '').replace(/\n/g, '<br>');
    }
}

const hideDescription = (event: any) => {
	const dept = event.target.id.split(",")[0];
	const num = parseInt(event.target.id.split(",")[1]);
	var courseIdx = getCourseIdx(dept, num);
	if (courseIdx >= 0) {
		event.target.textContent = cs_courses[courseIdx].dept + " " + cs_courses[courseIdx].num + " - " + cs_courses[courseIdx].name;
    }
}

const CourseCard = ({course, index, preReqNotMet}: ICourseCard) => {
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
					id={course.dept + "," + course.num}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}
					isAvailable={false}
					preReqNotMet={preReqNotMet}
					onMouseDown={hideDescription}
					onDoubleClick={showDescription}
					onMouseLeave={hideDescription}
				>
					{course.id + " - " + course.name}
				</Container>
			)}			
		</Draggable>		
	);
}

export default CourseCard;