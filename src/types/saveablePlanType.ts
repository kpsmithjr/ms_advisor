import MsOptionsType from "../types/msOptions";
import CourseType from "../types/courseType";
import SemItemType from "../types/semItemType"

type SaveablePlanType = {
	msOptions: MsOptionsType;
	waivers: CourseType[];
	restrictedCourses: CourseType[];
	completed: CourseType[];
	plan: SemItemType[];
	transferHours: number;
}

export default SaveablePlanType;