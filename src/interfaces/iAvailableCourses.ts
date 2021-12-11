import Course from "../types/courseType";
import SelectedSemester from "../types/selectedSemester";

interface IAvailableCourses {
	courses: Course[];
	selectedSemester: SelectedSemester;	
}

export default IAvailableCourses;