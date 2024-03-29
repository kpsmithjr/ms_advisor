import { orderBy } from "lodash";
import Semester from "./Semester";
import styled from "styled-components";

import Course from "../types/courseType";
import SemItem from "../types/semItemType";
import ISemesters from "../interfaces/iSemesters";

const PlannerContainer = styled.div`
	text-align: center;
`;

const SemestersContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-height: 600px;
	overflow-y: scroll;
`;

const Title = styled.h3`
	padding: 8px;
	text-align: center;
`;

const Semesters = ({semData, newSemesterHandler, courseId, restricted, selectedSemester, selSemHanlder}: ISemesters) => {
	
	const addSemester = () => {
		const lastSem = semData.slice(-1)[0];
		let newId:string, newYear:number, newTerm:string, newPosition:number, newMaxCredHrs:number;
		let newCourses = [] as Course[];

		if (lastSem.term === "FS") {
			newTerm = "SP";
			newYear = lastSem.year + 1;
		} else {
			newYear = lastSem.year;
			if (lastSem.term === "SP") {
				newTerm = "SS";				
			} else {
				newTerm = "FS";
			}
		}
		newPosition = lastSem.position + 1;
		newId = newTerm + "-" + newYear.toString();

		newMaxCredHrs = (newTerm === "SS") ? 3 : 9;

		const newSem: SemItem = {
			id: newId,
			year: newYear,
			term: newTerm,
			position: newPosition,
			maxCredHrs: newMaxCredHrs,
			courses: newCourses,
			courseOffered: false,
		}
		var newData = JSON.parse(JSON.stringify(semData));
		newData.push(newSem);
		
		newSemesterHandler(newData);
	}
	
	const semRenderer = orderBy(semData, "position").map((sem: SemItem) => 
		<div key={sem.id} >
			<Semester
				sem={sem}
				courseId={courseId}
				plan={semData}
				restricted={restricted}
				selectedSemester={selectedSemester}
				selSemHanlder={selSemHanlder}
			/>
		</div>		
	);

	return (
		<PlannerContainer>
			<Title>
				Semester Planner
			</Title>
			{<button onClick={addSemester}>Add Semester</button>}
			<SemestersContainer>
				{semRenderer}
			</SemestersContainer>
		</PlannerContainer>		
	)
}

export default Semesters;