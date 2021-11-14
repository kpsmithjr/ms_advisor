import { DragDropContext } from "react-beautiful-dnd"
import AvailableCourses from "./AvailableCourses";
import Semesters from "./Semesters";
import React, { useState } from "react";
import styled from "styled-components";

import Course from "../types/course";
import SemItem from "../types/semItem";

import csRotation from "../data/cs_courses.json"

const Container = styled.div`
 display: flex;
`

const defaultAvail = [
	{
		id: 'CS 4010',
		dept: 'CS',
		num: 4010,
		credHrs: 3
	},
	{
		id: 'CS 4011',
		dept: 'CS',
		num: 4011,
		credHrs: 3
	},
	{
		id: 'CS 4200',
		dept: 'CS',
		num: 4200,
		credHrs: 3
	},
	{
		id: 'CS 4250',
		dept: 'CS',
		num: 4250,
		credHrs: 3
	},
	{
		id: 'CS 4760',
		dept: 'CS',
		num: 4760,
		credHrs: 3
	},
	{
		id: 'CS 5012',
		dept: 'CS',
		num: 5012,
		credHrs: 3
	},	
	{
		id: 'CS 5020',
		dept: 'CS',
		num: 5020,
		credHrs: 3
	},
	{
		id: 'CS 5030',
		dept: 'CS',
		num: 5030,
		credHrs: 3
	},
	{
		id: 'CS 5130',
		dept: 'CS',
		num: 5130,
		credHrs: 3
	},
	{
		id: 'CS 5250',
		dept: 'CS',
		num: 5250,
		credHrs: 3
	},
	{
		id: 'CS 5300',
		dept: 'CS',
		num: 5300,
		credHrs: 3
	},
	{
		id: 'CS 5320',
		dept: 'CS',
		num: 5320,
		credHrs: 3
	},
	{
		id: 'CS 5340',
		dept: 'CS',
		num: 5340,
		credHrs: 3
	},
	{
		id: 'CS 5342',
		dept: 'CS',
		num: 5342,
		credHrs: 3
	},
	{
		id: 'CS 5370',
		dept: 'CS',
		num: 5370,
		credHrs: 3
	},
	{
		id: 'CS 5390',
		dept: 'CS',
		num: 5390,
		credHrs: 3
	},
	{
		id: 'CS 5420',
		dept: 'CS',
		num: 5420,
		credHrs: 3
	},
	{
		id: 'CS 5500',
		dept: 'CS',
		num: 5500,
		credHrs: 3
	},	
	{
		id: 'CS 5700',
		dept: 'CS',
		num: 5700,
		credHrs: 3
	},
	{
		id: 'CS 5750',
		dept: 'CS',
		num: 5750,
		credHrs: 3
	},
	{
		id: 'CS 5792',
		dept: 'CS',
		num: 5792,
		credHrs: 3
	},	
	{
		id: 'CS 6320',
		dept: 'CS',
		num: 6320,
		credHrs: 3
	},
	{
		id: 'CS 6340',
		dept: 'CS',
		num: 6340,
		credHrs: 3
	},
	{
		id: 'CS 6999',
		dept: 'CS',
		num: 6999,
		credHrs: 3
	}
]

const defaultSemList = [
	{
		id: 'FS-2021',
		year: 2021,
		term: "FS",		
		position: 1,
		courses: [{id: "CS 1000", dept: "CS", num: 1000}]
	},
	{
		id: 'SP-2022',
		year: 2022,
		term: "SP",
		position: 2,
		courses: [{id: "CS 1001", dept: "CS", num: 1001}]
	},
	{
		id: 'SS-2022',
		year: 2022,
		term: "SS",
		position: 3,
		courses: [{id: "CS 1002", dept: "CS", num: 1002}]
	},
	{
		id: 'FS-2022',
		year: 2022,
		term: "FS",
		position: 4,
		courses: [{id: "CS 1003", dept: "CS", num: 1003}]
	}
];

interface ICoursePlanner {
	plan: SemItem[];
	planHandler: any;
}

interface IGetSemIdx {
	plan: SemItem;
	semId: string;
}


const CoursePlanner = ({plan, planHandler}: ICoursePlanner) => {
	const [availCourses, setAvailCourses] = useState<Course[]>(defaultAvail);
		
	const getSemIdx = (plan: SemItem[], semId: string) => {
		for (let i:number = 0; i < plan.length; ++i) {
			if (plan[i].id === semId) return i;
		}
		return -1;
	}
	
	const onDragEnd = (result: any) => {
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

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Container>
				<AvailableCourses courses={availCourses}/>
				<Semesters semData={plan} newSemesterHandler={planHandler}/>
			</Container>			
		</DragDropContext>		
	)
}

export default CoursePlanner;