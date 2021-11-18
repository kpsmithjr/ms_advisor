import Course from "./course";

type SemItem = {
	id: string;
	year: number;
	term: string;
	position: number;
	maxCredHrs: number;
	courses: Course[];
	courseOffered: boolean;
}

export default SemItem;