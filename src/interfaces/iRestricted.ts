import CourseType from "../types/courseType";

interface IRestricted {
	restrictedCourses: CourseType[];
	handler: (newRestrictedCourse: CourseType[]) => void;
};

export default IRestricted;