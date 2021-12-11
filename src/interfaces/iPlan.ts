import MsOptionsType from "../types/msOptions";
import CourseType from "../types/courseType";
import SemItemType from "../types/semItemType"

interface IPlan {
	msOptions: MsOptionsType;
	waivers: CourseType[];
	restrictedCourses: CourseType[];
	oldPlan: SemItemType[];
	planHandler: (newPlan: SemItemType[]) => void;
	transferHrs:number;
	completed:CourseType[];
};

export default IPlan;