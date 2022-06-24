import { baseService } from "./BaseService";
export class CourseService extends baseService {
    addCourseService = (courseCode) => {
        return this.get(`courses/bycoursecode/${courseCode}`)
    }
    setSearchCourseService = (courseCode) => {
        return this.get(`courses?courseCode=${courseCode}`)
    }
    getAllCourseService = () => {
        return this.get(`courses`)
    }
    createCourseService = (model) => {
        return this.post(`courses`, model)
    }
    updateCourseService = (id, model) => {
        return this.put(`courses/${id}`, model)
    }
    deleteCourseService = (id) => {
        return this.delete(`courses/${id}`)
    }
    getAllUserService = () => {
        return this.get(`users`)
    }
    setSearchUserService = (username) => {
        return this.get(`users?username=${username}`)
    }
    createUserService = (model) => {
        return this.post(`users`, model)
    }
    updateUserService = (id, model) => {
        return this.put(`users/${id}`, model)
    }
    deleteUserService = (id) => {
        return this.delete(`users/${id}`)
    }
}

export const courseService = new CourseService();