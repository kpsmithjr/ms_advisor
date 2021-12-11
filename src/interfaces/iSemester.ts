import SemItem from "../types/semItemType";
import Course from "../types/courseType";
import SelectedSemester from "../types/selectedSemester";

interface ISemester {
	sem: SemItem;
	courseId: string;
	plan: SemItem[];
	restricted: Course[];
	selectedSemester: SelectedSemester;
	selSemHanlder: (newSelSem: SelectedSemester) => void;
};

export default ISemester;