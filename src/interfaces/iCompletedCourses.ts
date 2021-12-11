import CourseType from "../types/courseType";

interface ICompletedCourses {
	completed: CourseType[];
	msTrack: string;
	handler: (newCompleted: CourseType[]) => void ;
};

export default ICompletedCourses;