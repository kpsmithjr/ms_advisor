import CourseType from "../types/courseType";
import SemItemType from "../types/semItemType";
import msOptions from "../types/msOptions"

interface ICoursePlanner {
	options: msOptions;
	plan: SemItemType[];
	waivers: CourseType[];
	restrictedCourses: CourseType[];
	completed: CourseType[];
	planHandler: (newPlan: SemItemType[]) => void;
};

export default ICoursePlanner;