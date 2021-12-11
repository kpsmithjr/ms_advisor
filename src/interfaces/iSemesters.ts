import CourseType from "../types/courseType";
import SemItemType from "../types/semItemType";
import SelectedSemester from "../types/selectedSemester";

interface ISemesters {
	semData: SemItemType[];
	newSemesterHandler: (newPlan: SemItemType[]) => void;
	courseId: string;
	restricted: CourseType[];
	selectedSemester: SelectedSemester;
	selSemHanlder: (newSelSem: SelectedSemester) => void;
};

export default ISemesters;