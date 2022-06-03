import { baseService } from "./BaseService";
export class CourseService extends baseService {
    addCourseService = (courseCode) => {
        return this.get(`courses/bycoursecode/${courseCode}`)
    }
}

export const courseService = new CourseService();