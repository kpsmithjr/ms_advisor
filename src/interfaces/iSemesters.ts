import CourseType from "../types/courseType";
import SemItemType from "../types/semItemType";

interface ISemesters {
	semData: SemItemType[];
	newSemesterHandler: (newPlan: SemItemType[]) => void ;
	courseId: string;
	restricted: CourseType[];
};

export default ISemesters;