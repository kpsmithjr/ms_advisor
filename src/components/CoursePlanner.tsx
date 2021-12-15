import { DragDropContext } from "react-beautiful-dnd"
import AvailableCourses from "./AvailableCourses";
import Semesters from "./Semesters";
import React, { useState } from "react";
import styled from "styled-components";

import Course from "../types/courseType";
import SemItem from "../types/semItemType";
import SelectedSemester from "../types/selectedSemester";

import ICoursePlanner from "../interfaces/iCoursePlanner";

import cs_courses from "../data/cs_courses.json";
import math_courses from "../data/math_courses.json";

import cs_rotation from "../data/cs_rotation.json";
import math_rotation from "../data/math_rotation.json";
import track_reqs from "../data/track_req.json";


const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
`;

const defaultSelSem: SelectedSemester = { term: "", year: 0 };

const allTheCourses = cs_courses.concat(math_courses);
const allTheRotations = cs_rotation.concat(math_rotation);

const CoursePlanner = ( {options, plan, waivers, restrictedCourses, completed, planHandler}: ICoursePlanner) => {

	let optReq: any;
  let track_found = false;
  for (let i = 0; i < track_reqs.length; ++i) {
    if (options.msTrack === track_reqs[i].name) {
      optReq = track_reqs[i];
			console.log(optReq);
      track_found = true;
      break;
    }
  }

  if (!track_found) {
    console.log(options.msTrack);
    console.error("Unknown Track");
  }

	const getCourseName = (dept: string, num: number) => {
		for (let i = 0; i < allTheCourses.length; ++i) {
			if ((allTheCourses[i].dept === dept) && (allTheCourses[i].num === num)) {
				return allTheCourses[i].name;
			}
		}	
		return "";
	};

	const isCourseWaived = (dept: string, num: number):boolean => {
		for (let i = 0; i < waivers.length; ++i) {
			if ((waivers[i].dept === dept) && (waivers[i].num === num)) {
				return true;
			}
		}
		return false;
	};

	const isCoursRestricted = (dept:string, num:number):boolean => {
		for (let i = 0; i < restrictedCourses.length; ++i) {
			if ((restrictedCourses[i].dept === dept) && (restrictedCourses[i].num === num)) {
				return true;
			}
		}
		return false;
	};

	const isCourstCompleted = (dept:string, num:number):boolean => {
		for (let i = 0; i < completed.length; ++i) {
			if ((completed[i].dept === dept) && (completed[i].num === num)) {
				return true;
			}
		}
		return false;
	};

	const isCoursePlanned = (dept: string, num: number) => {
		for (let i = 0; i < plan.length; ++i) {
			for (let j = 0; j < plan[i].courses.length; ++j) {
				if ((plan[i].courses[j].dept === dept) && (plan[i].courses[j].num === num)) {
					return true;
				}
			}			
		}
		return false;
	};

	const meetsMyOptions = (offeredEvening: boolean, offeredOnline: boolean) => {
		if ((options.eveningOnly && !offeredEvening) || (options.onlineOnly && !offeredOnline)) {
			return false;
		} else {
			return true;
    }
	}

	const getAvailCourses = () => {
		let arr = [] as Course[];
		for (let i = 0; i < restrictedCourses.length; ++i) {
			const tmp = {
				id: restrictedCourses[i].dept + " " + restrictedCourses[i].num.toString(),
				dept: restrictedCourses[i].dept,
				num: restrictedCourses[i].num,
				name: getCourseName(restrictedCourses[i].dept, restrictedCourses[i].num),
				credHrs: 3
			};

			if (!isCoursePlanned(tmp.dept, tmp.num)) {
				arr.push(tmp);
      }
    }
		for (let i = 0; i < cs_rotation.length; ++i) {
			const tmp = {
				id: allTheRotations[i].dept + " " + allTheRotations[i].num,
				dept: allTheRotations[i].dept,
				num: allTheRotations[i].num,
				name: getCourseName(allTheRotations[i].dept, allTheRotations[i].num),
				credHrs: 3
			};

			if (tmp.num >= 4000 &&
				!isCourseWaived(tmp.dept, tmp.num) &&
				!isCourstCompleted(tmp.dept, tmp.num) &&
				!isCoursePlanned(tmp.dept, tmp.num) &&
				meetsMyOptions(allTheRotations[i].evening, allTheRotations[i].online)) {

				arr.push(tmp);
			}
		}

		for (let i = 0; i < optReq.electives.length; ++i) {
			for (let j = 0; j < optReq.electives[i].courses.length; ++j) {
				if (optReq.electives[i].courses[j].dept === "MATH") {
					const tmp_dept = optReq.electives[i].courses[j].dept;
					const tmp_num = optReq.electives[i].courses[j].num;
					const tmp = {
						id: tmp_dept + " " + tmp_num.toString(),
						dept: tmp_dept,
						num: tmp_num,
						name: getCourseName(tmp_dept, tmp_num),
						credHrs: 3
					};
		
					if (tmp.num >= 4000 &&
						!isCourseWaived(tmp.dept, tmp.num) &&
						!isCourstCompleted(tmp.dept, tmp.num) &&
						!isCoursePlanned(tmp.dept, tmp.num) &&
						meetsMyOptions(allTheRotations[i].evening, allTheRotations[i].online)) {
		
						arr.push(tmp);
					}
				}
			}
		}
		
		return arr;
	}

	const [availCourses, setAvailCourses] = useState<Course[]>(getAvailCourses());
	
	
	const [selectedSemester, setSelectedSemester] = React.useState<SelectedSemester>(defaultSelSem);
	const [selectedCourseID, setSelectedCourseID] = React.useState("");
	const onDragStart = (start: any) => {
		setSelectedCourseID(start.draggableId);
	}

	const updateSelectedPlan = (newSelSem: SelectedSemester):void => {
		setSelectedSemester(newSelSem);
  };

	const filterYearTerm = (course: Course[], selSem:SelectedSemester):Course[] => {
		if ((selSem.term === "") && (selSem.year === 0)) {
			return course;
		}

		let output = [] as Course[];
		// Loop through all courses
		for (let i = 0; i < course.length; ++i) {
			let rot_entry:any = null;

			// Find the course in the cs rotation
			for (let j = 0; j < allTheRotations.length; ++j) {
				// Check if the j-th entry in the cs rotation matches the i-th course
				if ((allTheRotations[j].dept === course[i].dept) && (allTheRotations[j].num === course[i].num)) {
					rot_entry = allTheRotations[j];
					break;
				}
			}
		
			if (rot_entry === null) {
				console.error("Could not find course in CS/MATH rotation");
			} else {
				// Check if the j-th course is offered in the selected year
				if (((selSem.year % 2 === 0) && rot_entry.evenYr) || ((selSem.year % 2 === 1) && rot_entry.oddYr)) {
					// Check if the i-th course is offered in the selected term
					if (((selSem.term === "SP") && rot_entry.springSem) ||
							((selSem.term === "SS") && rot_entry.summerSem) ||
							((selSem.term === "FS") && rot_entry.fallSem)) {	
						output.push(course[i]);
					}
				}
			}			
		}
		
		return output;
	};

	const [coursesToDisplay, setCoursesToDisplay] = React.useState<Course[]>(availCourses);
	
	const getSemIdx = (plan: SemItem[], semId: string) => {
		for (let i:number = 0; i < plan.length; ++i) {
			if (plan[i].id === semId) return i;
		}
		return -1;
	}

	const getNewAvailIdx = (curAvail: Course[], addedCourse: Course) => {
		for (let i: number = 0; i < curAvail.length; ++i) {
			if (addedCourse.num < curAvail[i].num) return i;
		}
		return curAvail.length;
	}
	
	const onDragEnd = (result: any) => {
		setSelectedCourseID("");
		const { destination, source } = result;
				
		// Item is dropped over non-droppable space
		if (!destination) {
			return;
		}

		// Item is dropped over the same droppable space as it was 
		// picked up from
		if ( destination.droppableId === source.droppableId ) {
			return;
		}

		// Item is moved from one droppable space to another
		if (destination.droppableId !== source.droppableId) {
			// Item is moved from "available courses" to a semester
			if (source.droppableId === "AVAILABLE-COURSES") {
				// Get index of semester, return if no valid index is found
				const tgtIdx = getSemIdx(plan, destination.droppableId);
				if (tgtIdx === -1) {
					return;
				}
				
				// Deep copy of available courses
				let newAvail = JSON.parse(JSON.stringify(coursesToDisplay));
				const [item] = newAvail.splice(source.index, 1); // Remove item
				setCoursesToDisplay(newAvail); // Update available courses
								
				// Deep copy of plan
				let newPlan = JSON.parse(JSON.stringify(plan));
				newPlan[tgtIdx].courses.push(item);
				planHandler(newPlan);
				
				// Item was moved from "available space" to a semester
			} else if (destination.droppableId === "AVAILABLE-COURSES") {
				const srcIdx = getSemIdx(plan, source.droppableId);
				if (srcIdx === -1) {
					return;
				}

				// Deep copy of plan
				let newPlan = JSON.parse(JSON.stringify(plan));
				const [item] = newPlan[srcIdx].courses.splice(source.index, 1); // Remove item
				planHandler(newPlan);

				// Deep copy of available courses
				let newAvail = JSON.parse(JSON.stringify(coursesToDisplay));
				var idx = getNewAvailIdx(newAvail, item);
				newAvail.splice(idx, 0, item);
				setCoursesToDisplay(newAvail);

			} else { // Moving between semesters
				const srcIdx = getSemIdx(plan, source.droppableId);
				if (srcIdx === -1) {
					return;
				}

				const tgtIdx = getSemIdx(plan, destination.droppableId);
				if (srcIdx === -1) {
					return;
				}

				let newPlan = JSON.parse(JSON.stringify(plan));
				const [item] = newPlan[srcIdx].courses.splice(source.index, 1); // Remove item
				newPlan[tgtIdx].courses.push(item);
				planHandler(newPlan);
			}
			return;
		}
		return;
	}

	React.useEffect(() => {
		const tmp = filterYearTerm(getAvailCourses(), selectedSemester);
		setCoursesToDisplay(tmp);
	}, [selectedSemester, availCourses]);

	return (
		<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
			<Container>
				<AvailableCourses courses={coursesToDisplay} />
				<Semesters
					semData={plan}
					newSemesterHandler={planHandler}
					courseId={selectedCourseID}
					restricted={restrictedCourses}
					selectedSemester={selectedSemester}
					selSemHanlder={updateSelectedPlan}
				/>
			</Container>
		</DragDropContext>
	)
}

export default CoursePlanner;