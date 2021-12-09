import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import CourseCard from "./CourseCard";

import SemItem from "../types/semItemType";

import cs_rotation from "../data/cs_rotation.json";
import cs_courses from "../data/cs_courses.json";

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

const Semester = ({sem, courseId, plan}: {sem:SemItem, courseId:string, plan:SemItem[]}) => {
	
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

	const preReqNotMet = ({dept, num}: {dept:string, num:number}):boolean => {
		
		// Check if term1 is before term2 
		const isTermBefore = (term1:string, term2:string):boolean => {
			if ((term2 === "FS") && ((term1 === "SP") || (term1 === "SS"))) {
				return true;
			} else if ((term2 === "SS") && (term1 === "SP")) {
				return true;
			} else {
				return false;
			}
		}

		// Declare function to look up if courese in plan before a certain year/term
		const isCourseInPlanBefore = (dept: string, num:number, year:number, term:string): boolean => {
			for (let i = 0; i < plan.length; ++i) {
				for (let j = 0; j < plan[i].courses.length; ++j) {
					if ((dept === plan[i].courses[j].dept)
						&& (num === plan[i].courses[j].num)) {
						
							// Check if the i-th semetser is before the current semester
							if (plan[i].year < sem.year) {
								return true;
							} else if (plan[i].year === sem.year) {
								return isTermBefore(plan[i].term, sem.term);
							}
					}
				}
			}
			return false;
		};

		// Declare function to look up prerequisites in courese catalog
		const getPrereqs = (dept:string, num:number) => {
			for (let i = 0; i < cs_courses.length; ++i) {
				// Check if the i-th course in the catalog matches dept/num
				if ((cs_courses[i].dept === dept) && (cs_courses[i].num === num)) {
					return cs_courses[i].prerequisite;
				}
			}
			return null;
		};

		const prereqs = getPrereqs(dept, num);
		if (prereqs === null) {
			return false;
		}

		for (let i = 0; i < prereqs.length; ++i) {
			let numMet = 0;
			for (let j = 0; j < prereqs[i].courses.length; ++j) {
				// Check if the j-th course in the i-th prereq is in the plan before the current year/term
				if (isCourseInPlanBefore(prereqs[i].courses[j].dept, prereqs[i].courses[j].num, sem.year, sem.term)) {
					++numMet;
				}
			}
			// The required number of prereqs is not met, return true
			if (numMet < prereqs[i].numReq) {
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
							<CourseCard key={course.id} course={course} index={index} preReqNotMet={preReqNotMet(course)}/>
						))}
						{provided.placeholder}
					</CourseList>											
				)}
			</Droppable>
		</Container>
	)
}

export default Semester;