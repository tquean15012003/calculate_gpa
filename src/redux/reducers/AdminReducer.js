import { SET_COURSE_LIST, SET_SEARCH_COURSE_LIST, SET_SEARCH_USER_LIST, SET_USER_LIST } from "../constants/AdminConsts";

const stateDefault = {
    courseList: [],
    searchCourseList: [],
    userList: [],
    searchUserList: [],
    requestList: [],
};

export const AdminReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_COURSE_LIST:{
            return { ...state, courseList: action.courseList}
        }
        case SET_SEARCH_COURSE_LIST: {
            return { ...state, searchCourseList: action.searchCourseList}
        }
        case SET_USER_LIST: {
            return { ...state, userList: action.userList}
        }
        case SET_SEARCH_USER_LIST: {
            return { ...state, searchUserList: action.searchUserList}
        }
        default: return { ...state };
    };
};