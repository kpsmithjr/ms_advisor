import { DragDropContext } from "react-beautiful-dnd"
import AvailableCourses from "./AvailableCourses";
import Semesters from "./Semesters";
import React, { useState } from "react";
import styled from "styled-components";

import Course from "../types/courseType";
import SemItem from "../types/semItemType";

import ICoursePlanner from "../interfaces/iCoursePlanner"

import cs_courses from "../data/cs_courses.json"
import { stringify } from "querystring";

const Container = styled.div`
 display: flex;
`

const defaultAvail = [
	{
		dept: 'CS',
		num: 4010
	},
	{
		dept: 'CS',
		num: 4011
	},
	{
		dept: 'CS',
		num: 4200
	},
	{
		dept: 'CS',
		num: 4250
	},
	{
		dept: 'CS',
		num: 4610
	},
	{
		dept: 'CS',
		num: 4700
	},
	{
		dept: 'CS',
		num: 4730
	},
	{
		dept: 'CS',
		num: 4760
	},
	{
		dept: 'CS',
		num: 5012
	},	
	{
		dept: 'CS',
		num: 5020
	},
	{
		dept: 'CS',
		num: 5030
	},
	{
		dept: 'CS',
		num: 5130
	},
	{
		dept: 'CS',
		num: 5222
	},
	{
		dept: 'CS',
		num: 5300
	},
	{
		dept: 'CS',
		num: 5320
	},
	{
		dept: 'CS',
		num: 5340
	},
	{
		dept: 'CS',
		num: 5342
	},
	{
		dept: 'CS',
		num: 5370
	},
	{
		dept: 'CS',
		num: 5390
	},
	{
		dept: 'CS',
		num: 5420
	},
	{
		dept: 'CS',
		num: 5500
	},	
	{
		dept: 'CS',
		num: 5700
	},
	{
		dept: 'CS',
		num: 5702
	},
	{
		dept: 'CS',
		num: 5732
	},
	{
		dept: 'CS',
		num: 5750
	},
	{
		dept: 'CS',
		num: 5782
	},
	{
		dept: 'CS',
		num: 5792
	},
	{
		dept: 'CS',
		num: 5794
	},
	{
		dept: 'CS',
		num: 5994
	},
	{
		dept: 'CS',
		num: 6320
	},
	{
		dept: 'CS',
		num: 6340
	},
	{
		dept: 'CS',
		num: 6900
	}
]

interface IGetSemIdx {
	plan: SemItem;
	semId: string;
}

const CoursePlanner = ({plan, waivers, planHandler}: ICoursePlanner) => {

	const getCourseName = (dept: string, num: number) => {
		for (let i = 0; i < cs_courses.length; ++i) {
			if ((cs_courses[i].dept === dept) && (cs_courses[i].num === num)) {
				return cs_courses[i].name;
			}
		}
		return "";
	};

	const isCourseWaived = (dept: string, num: number) => {
		for (let i = 0; i < waivers.length; ++i) {
			if ((waivers[i].dept === dept) && (waivers[i].num === num)) {
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

	const getAvailCourses = () => {
		let arr = [] as Course[];
		for (let i = 0; i < defaultAvail.length; ++i) {
			const tmp = {
				id: defaultAvail[i].dept + " " + defaultAvail[i].num,
				dept: defaultAvail[i].dept,
				num: defaultAvail[i].num,
				name: getCourseName(defaultAvail[i].dept, defaultAvail[i].num),
				credHrs: 3
			};

			if (!isCourseWaived(tmp.dept, tmp.num) && !isCoursePlanned(tmp.dept, tmp.num)) {
				arr.push(tmp);
			}			
		}
		return arr;
	}

	const [availCourses, setAvailCourses] = useState<Course[]>(getAvailCourses());
		
	const getSemIdx = (plan: SemItem[], semId: string) => {
		for (let i:number = 0; i < plan.length; ++i) {
			if (plan[i].id === semId) return i;
		}
		return -1;
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
				var newAvail = JSON.parse(JSON.stringify(availCourses));
				const [item] = newAvail.splice(source.index, 1); // Remove item
				setAvailCourses(newAvail); // Update available courses
								
				// Deep copy of plan
				var newPlan = JSON.parse(JSON.stringify(plan));
				newPlan[tgtIdx].courses.push(item);
				planHandler(newPlan);
				
				// Item was moved from "available space" to a semester
			} else if (destination.droppableId === "AVAILABLE-COURSES") {
				const srcIdx = getSemIdx(plan, source.droppableId);
				if (srcIdx === -1) {
					return;
				}

				// Deep copy of plan
				var newPlan = JSON.parse(JSON.stringify(plan));
				const [item] = newPlan[srcIdx].courses.splice(source.index, 1); // Remove item
				planHandler(newPlan);

				// Deep copy of available courses
				var newAvail = JSON.parse(JSON.stringify(availCourses));
				newAvail.push(item);
				setAvailCourses(newAvail);

			} else { // Moving between semesters
				console.log("Moving between semetsers");

				const srcIdx = getSemIdx(plan, source.droppableId);
				if (srcIdx === -1) {
					return;
				}

				const tgtIdx = getSemIdx(plan, destination.droppableId);
				if (srcIdx === -1) {
					return;
				}

				var newPlan = JSON.parse(JSON.stringify(plan));
				const [item] = newPlan[srcIdx].courses.splice(source.index, 1); // Remove item
				newPlan[tgtIdx].courses.push(item);
				planHandler(newPlan);
			}
			return;
		}
		return;
	}

	const [selectedCourseID, setSelectedCourseID] = React.useState("");
	const onDragStart = (start: any) => {
		setSelectedCourseID(start.draggableId);
	}

	return (
		<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
			<Container>
				<AvailableCourses courses={availCourses}/>
				<Semesters semData={plan} newSemesterHandler={planHandler} courseId={selectedCourseID}/>
			</Container>			
		</DragDropContext>		
	)
}

export default CoursePlanner;