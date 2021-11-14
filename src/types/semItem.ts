import Course from "./course";

type SemItem = {
	id: string;
	year: number;
	term: string;
	position: number;
	maxCredHrs: number;
	courses: Course[];
}

export default SemItem;