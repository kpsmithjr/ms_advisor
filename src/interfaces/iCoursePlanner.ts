import CourseType from "../types/courseType";
import SemItemType from "../types/semItemType";

interface ICoursePlanner {
	plan: SemItemType[];
	waivers: CourseType[];
	restrictedCourses: CourseType[];
	planHandler: (newPlan: SemItemType[]) => void;
};

export default ICoursePlanner;