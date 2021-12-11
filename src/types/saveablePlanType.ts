import MsOptionsType from "../types/msOptions";
import CourseType from "../types/courseType";
import SemItemType from "../types/semItemType"

type SaveablePlanType = {
	msOptions: MsOptionsType;
	restrictedCourses: CourseType[];
	transferHrs: number;
	waivers: CourseType[];
	completed: CourseType[];
	plan: SemItemType[];	
}

export default SaveablePlanType;