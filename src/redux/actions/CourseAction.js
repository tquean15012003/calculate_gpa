import { courseService } from "../../services/CourseService";
import { ADD_COURSE, DROP_COURSE, RESET_CALCULATE, SET_CGPA, SET_CREDITS_EARNED } from "../constants/CourseConsts";

export const addCourseAction = (addCourseInfo, gradeRange) => {
    const { courseCode, grade } = addCourseInfo
    if (courseCode.trim() === "") {
        alert("Cannot leave course code blank!");
        return;
    }
    const index = gradeRange.findIndex(gradeCheck => gradeCheck.letterGrade === grade.toUpperCase())
    if (index === -1) {
        alert("Please key in grade in the correct format!");
        return;
    }
    return async (dispatch, getState) => {
        try {
            const { data } = await courseService.addCourseService(courseCode);
            dispatch({
                type: ADD_COURSE,
                courseAdded: {
                    id: data.course.id,
                    courseCode: data.course.courseCode,
                    courseName: data.course.courseName,
                    noAU: data.course.noAU,
                    letterGrade: gradeRange[index].letterGrade,
                    gradePoint: gradeRange[index].gradePoint
                }
            })
        } catch (errors) {
            alert(errors.response.data.message + "\nPlease report to us to add your courses");
        }
    }
}

export const setCGPAAction = (CGPA) => ({
    type: SET_CGPA,
    CGPA
})

export const setCreditsEarned = (creditsEarned) => ({
    type: SET_CREDITS_EARNED,
    creditsEarned
})

export const resetCalculateAction = () => ({
    type: RESET_CALCULATE,
})

export const dropCourseAction = (id) => ({
    type: DROP_COURSE,
    id
})