import SemItemType from "../types/semItemType";

interface ISemesters {
	semData: SemItemType[];
	newSemesterHandler: (newPlan: SemItemType[]) => void ;
	courseId: string;
};

export default ISemesters;