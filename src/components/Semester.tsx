import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import CourseCard from "./CourseCard";

import SelectedSemester from "../types/selectedSemester";
import ISemester from "../interfaces/iSemester";

import cs_rotation from "../data/cs_rotation.json";
import cs_courses from "../data/cs_courses.json";

import math_rotation from "../data/math_rotation.json";
import math_courses from "../data/math_courses.json";

import ugradCourses from "../data/restricted.json";
import { resolveUrl } from "ajv/dist/compile/resolve";

const allTheCourses = cs_courses.concat(math_courses);
const allTheRotations = cs_rotation.concat(math_rotation);


interface ICourseList {
	isDropDisabled: boolean;
	isDraggingOver: boolean;
};

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgray;
	border-radius: 2px;
	width: 360px;
	min-height: 100px;
`;

const CourseList = styled.div<ICourseList>`
	padding: 8px;
	transition: background-color 0.2s ease;
	background-color: ${props => (props.isDropDisabled ? 'lightgrey' : props.isDraggingOver ? 'skyblue' : 'white')};
	min-height: 115px;
	display: flex;
	flex-direction: column;
`;

interface IButton {
	selected:boolean;
}

const ButtonStyle = styled.button<IButton>`
	background-color: ${props => (props.selected ? 'skyblue' : 'lightgrey')};
`
const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	color: red;
`;

const Semester = ({sem, courseId, plan, restricted, selectedSemester, selSemHanlder}: ISemester) => {
	
	const courseOffered = () => {
		if (courseId === "") {
			return true;
		}
		
		for (let i = 0; i < allTheRotations.length; ++i) {
			if (courseId === (allTheRotations[i].dept + " " + allTheRotations[i].num.toString())) {
				
				// Check that the course is offered in this current semester
				if (((sem.term === "SP") && !allTheRotations[i].springSem) ||
						((sem.term === "SS") && !allTheRotations[i].summerSem) ||
						((sem.term === "FS") && !allTheRotations[i].fallSem)) {
					return false;					
				}

				if (((sem.year % 2 === 0) && !allTheRotations[i].evenYr) || 
						((sem.year % 2 === 1) && !allTheRotations[i].oddYr)) {
					return false;
				}
				
				return true;
			}
		}
		return false;
	};

	const preReqNotMet = ({dept, num}: {dept:string, num:number}):boolean => {
		
		if (num < 4000) {
			return false;
		}
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
					if ((dept === plan[i].courses[j].dept) && (num === plan[i].courses[j].num)) {
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

		const isCourseInUGradPlan = (dept:string, num:number):boolean => {
			for (let i = 0; i < restricted.length; ++i) {
				if ((dept === restricted[i].dept) && (num === restricted[i].num)) {
					return false ;
				}
			}

			for (let i = 0; i < ugradCourses.length; ++i) {
				if ((dept === ugradCourses[i].dept) && (num === ugradCourses[i].num)) {
					return true;
				}
			}
			return false;
		}

		// Declare function to look up prerequisites in courese catalog
		const getPrereqs = (dept:string, num:number) => {
			for (let i = 0; i < allTheCourses.length; ++i) {
				// Check if the i-th course in the catalog matches dept/num
				if ((allTheCourses[i].dept === dept) && (allTheCourses[i].num === num)) {
					return allTheCourses[i].prerequisite;
				}
			}
			return null;
		};

		// Check if the prerequisites are meet due to graduate status
		const isPrereqWaivedAsGrad = (dept:string, num:number):boolean => {
			for (let i = 0; i < allTheCourses.length; ++i) {
				// Check if the i-th course in the catalog matches dept/num
				if ((allTheCourses[i].dept === dept) && (allTheCourses[i].num === num)) {					
					return allTheCourses[i].waivePrereqAsGrad;
				}
			}
			return false;
		}

		if (isPrereqWaivedAsGrad(dept, num)) {
			return false;
		}

		const prereqs = getPrereqs(dept, num);
		if (prereqs === null) {
			return false;
		}

		for (let i = 0; i < prereqs.length; ++i) {
			let numMet = 0;
			for (let j = 0; j < prereqs[i].courses.length; ++j) {
				// Check if the j-th course in the i-th prereq is in the plan before the current year/term
				if ((isCourseInPlanBefore(prereqs[i].courses[j].dept, prereqs[i].courses[j].num, sem.year, sem.term))
				 || (isCourseInUGradPlan(prereqs[i].courses[j].dept, prereqs[i].courses[j].num))){
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

	const isSemSelected = ():boolean => {
		if ((selectedSemester.year === sem.year) && (selectedSemester.term === sem.term)) {
			return true;
		}
		return false;
	};

	const updateSelectedSem = () => {
		let newSelSem:SelectedSemester = {year: 0, term: ""};

		if (isSemSelected()) {
			selSemHanlder(newSelSem);
		} else {
			newSelSem.term = sem.term;
			newSelSem.year = sem.year;
			selSemHanlder(newSelSem);
		}		
	};

	return (
		<Container>
			<ButtonContainer>
				<ButtonStyle
					onClick={updateSelectedSem}
					selected={isSemSelected()}
				>{sem.term} {sem.year}
				</ButtonStyle> 
			</ButtonContainer>			
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