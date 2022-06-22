import { baseService } from "./BaseService";
export class CourseService extends baseService {
    addCourseService = (courseCode) => {
        return this.get(`courses/bycoursecode/${courseCode}`)
    }
    setSearchCourseService = (courseCode) => {
        return this.get(`courses?courseCode=${courseCode}`)
    }
}

export const courseService = new CourseService();