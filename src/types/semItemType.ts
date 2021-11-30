import Course from "./courseType";

type SemItemType = {
	id: string;
	year: number;
	term: string;
	position: number;
	maxCredHrs: number;
	courses: Course[];
	courseOffered: boolean;
}

export default SemItemType;