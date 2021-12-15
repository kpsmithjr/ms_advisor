import styled from "styled-components";
import { Draggable} from "react-beautiful-dnd";

import Course from "../types/courseType";
import cs_courses from "../data/cs_courses.json"
import math_courses from "../data/math_courses.json";

import cs_rotation from "../data/cs_rotation.json";
import math_rotation from "../data/math_rotation.json";

const allTheCourses = cs_courses.concat(math_courses);
const allTheRotations = cs_rotation.concat(math_rotation);

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
	for (let i = 0; i < allTheCourses.length; ++i) {
		if ((allTheCourses[i].dept === dept) && (allTheCourses[i].num === num)) {
			return i;
		}
	}
	return -1;
};

const getRotationIdx = (dept: string, num: number) => {
	for (let i = 0; i < allTheRotations.length; ++i) {
		if ((allTheRotations[i].dept === dept) && (allTheRotations[i].num === num)) {
			return i;
		}
	}
	return -1;
};

const getAvailabilityStr = (dept: string, num: number) => {
	var availStr: string = "";
	const rotId = getRotationIdx(dept, num);
	if (rotId >= 0) {
		const rotInfo = allTheRotations[getRotationIdx(dept, num)];

		if (rotInfo) {
			const sems = [];
			if (rotInfo.springSem) { sems.push("Spring") };
			if (rotInfo.summerSem) { sems.push("Summer") };
			if (rotInfo.fallSem) { sems.push("Fall") };
			availStr += "Semesters Offered: " + sems.join(", ") + "\n";

			if (!(rotInfo.evenYr && rotInfo.oddYr)) {
				const yrs = [];
				if (rotInfo.evenYr) { yrs.push("Even") };
				if (rotInfo.oddYr) { yrs.push("Odd") };
				availStr += "Years Offered: " + yrs.join(", ") + "\n";
			}

			const times = [];
			if (rotInfo.day) { times.push("Day") };
			if (rotInfo.evening) { times.push("Evening") };
			if (rotInfo.online) { times.push("Online") };
			if (rotInfo.arranged) { times.push("Arranged") };
			availStr += "Times Offered: " + times.join(", ");
        }
	}
	return availStr;
}

//The description is based on the course container id's being set to dept,num csv string in CourseCard below
//TODO: is it better to show the description on mouseenter? or onclick, followed by hiding ondrag + onmouseup?
const showDescription = (event: any) => {
	const dept = event.target.id.split(",")[0];
	const num = parseInt(event.target.id.split(",")[1]);
	var courseIdx = getCourseIdx(dept, num);
	//console.log(event.target);
	//console.dir(event.target);
	if (courseIdx >= 0) {
		const course = allTheCourses[courseIdx];

		if (course) {
			var newStr = event.target.textContent += "\n\n" + getAvailabilityStr(course.dept, course.num) + "\n\n" + course.description;
			event.target.textContent = newStr;
			event.target.innerHTML = newStr.replace(/\r/g, '').replace(/\n/g, '<br>');
        }

		
    }
}

const hideDescription = (event: any) => {
	const dept = event.target.id.split(",")[0];
	const num = parseInt(event.target.id.split(",")[1]);
	var courseIdx = getCourseIdx(dept, num);
	if (courseIdx >= 0) {
		event.target.textContent = allTheCourses[courseIdx].dept + " " + allTheCourses[courseIdx].num + " - " + allTheCourses[courseIdx].name;
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