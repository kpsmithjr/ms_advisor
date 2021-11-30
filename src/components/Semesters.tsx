import { useState } from "react";
import { orderBy } from "lodash";
import Semester from "./Semester";
import styled from "styled-components";

import Course from "../types/courseType";
import SemItem from "../types/semItemType";
import ISemesters from "../interfaces/iSemester";

const SemestersContainer = styled.div`
	display: inline-flex;
	flex-wrap: wrap;
	max-height: 600px;
	alignment: center;
	overflow-y: scroll;
`

const Contianer = styled.div`
`

interface ISemtersProps {
	semData: SemItem[];
	newSemesterHandler: any
}

const Semesters = ({semData, newSemesterHandler, courseId}: ISemesters) => {
	
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
			<Semester sem={sem} courseId={courseId}/>
		</div>		
	);

	return (
		<div>
			{<button onClick={addSemester}>Add Semester</button>}
			<div>
				<SemestersContainer>
				{semRenderer}
				</SemestersContainer>
			</div>			
		</div>		
	)
}

export default Semesters;