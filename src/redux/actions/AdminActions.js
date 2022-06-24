import { courseService } from "../../services/CourseService"
import { SET_COURSE_LIST, SET_SEARCH_COURSE_LIST, SET_SEARCH_USER_LIST, SET_USER_LIST } from "../constants/AdminConsts"

const updateCourseList = (courseList) => ({
    type: SET_COURSE_LIST,
    courseList
})

const updateUserList = (userList) => ({
    type: SET_USER_LIST,
    userList
})

const updateSearchCourseList = (searchCourseList) => ({
    type: SET_SEARCH_COURSE_LIST,
    searchCourseList
})

const updateSearchUserList = (searchUserList) => ({
    type: SET_SEARCH_USER_LIST,
    searchUserList
})

export const getAllCourseAction = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await courseService.getAllCourseService()
            dispatch(updateCourseList(data.courseList))
        } catch (errors) {
            alert(errors.response.data.message)
        }
    }
}

export const setSearchCourseAdminAction = (courseCode) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await courseService.setSearchCourseService(courseCode.trim().toUpperCase());
            dispatch(updateSearchCourseList(data.courseList))
        } catch (errors) {
            alert(errors.response.data.message)
        }
    }
}

export const deleteCourseAdminAction = (id) => {
    return async (dispatch, getState) => {
        try {
            await courseService.deleteCourseService(id);
            await dispatch(getAllCourseAction())
            alert("Delete the course successfully")
        } catch (errors) {
            alert(errors.response.data.message)
        }
    }
}

export const addCourseAdminAction = (courseInfo) => {
    return async (dispatch, getState) => {
        try {
            await courseService.createCourseService(courseInfo);
            await dispatch(getAllCourseAction())
            alert("Add the course successfully")
        } catch (errors) {
            alert("Course code may exist already")
        }
    }
}

export const updateCourseAdminAction = (courseInfo) => {
    return async (dispatch, getState) => {
        try {
            await courseService.updateCourseService(courseInfo.id, courseInfo);
            await dispatch(getAllCourseAction())
            alert("Update the course successfully")
        } catch (errors) {
            alert("Course code may exist already")
        }
    }
}

export const getAllUserAction = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await courseService.getAllUserService()
            console.log(data)
            dispatch(updateUserList(data.userList))
        } catch (errors) {
            console.log(errors)
            alert(errors.response.data.message)
        }
    }
}

export const setSearchUserAdminAction = (username) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await courseService.setSearchUserService(username);
            dispatch(updateSearchUserList(data.userList))
        } catch (errors) {
            alert(errors.response.data.message)
        }
    }
}

export const deleteUserAdminAction = (id) => {
    return async (dispatch, getState) => {
        try {
            await courseService.deleteUserService(id);
            await dispatch(getAllUserAction())
            alert("Delete the user successfully")
        } catch (errors) {
            alert(errors.response.data.message)
        }
    }
}

export const updateUserAdminAction = (userInfo) => {
    return async (dispatch, getState) => {
        try {
            await courseService.updateUserService(userInfo.id, userInfo);
            await dispatch(getAllUserAction())
            alert("Update the user successfully")
        } catch (errors) {
            alert("Email/Phone number must be unique!")
        }
    }
}