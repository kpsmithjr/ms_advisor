import MsOptionsType from "../types/msOptions";
import CourseType from "../types/courseType";
import SemItemType from "../types/semItemType"

type SaveablePlanType = {
	msOptions: MsOptionsType;
	waivers: CourseType[];
	restrictedCourses: CourseType[];
	plan: SemItemType[]
}

export default SaveablePlanType;