import { ADD_COURSE, DROP_COURSE, RESET_CALCULATE, SET_CGPA, SET_COURSE_SEARCH, SET_CREDITS_EARNED } from "../constants/CourseConsts";

const stateDefault = {
    courseList: [],
    gradeRange: [
        {
            letterGrade: "A+",
            gradePoint: 5.00
        },
        {
            letterGrade: "A",
            gradePoint: 5.00
        },
        {
            letterGrade: "A-",
            gradePoint: 4.50
        },
        {
            letterGrade: "B+",
            gradePoint: 4.00
        },
        {
            letterGrade: "B",
            gradePoint: 3.50
        },
        {
            letterGrade: "B-",
            gradePoint: 3.00
        },
        {
            letterGrade: "C+",
            gradePoint: 2.50
        },
        {
            letterGrade: "C",
            gradePoint: 2.00
        },
        {
            letterGrade: "D+",
            gradePoint: 1.50
        },
        {
            letterGrade: "D",
            gradePoint: 1.00
        },
        {
            letterGrade: "F",
            gradePoint: 0.00
        },

    ],
    priorCGPA: {
        CGPA: "",
        creditsEarned: ""
    },
    courseSearch: []
};

export const CourseReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case ADD_COURSE: {
            let courseList = state.courseList;
            const index = courseList.findIndex(course => course.id === action.courseAdded.id);
            console.log(action.courseAdded.courseName)
            if (index === -1 || action.courseAdded.courseName.slice(0, 3) === "BDE") {
                courseList.push(action.courseAdded)
            } else {
                alert("The course has been added!")
            }
            return { ...state, courseList };
        }
        case SET_CGPA: {
            state.priorCGPA.CGPA = action.CGPA;
            return { ...state }
        }
        case SET_CREDITS_EARNED: {
            state.priorCGPA.creditsEarned = action.creditsEarned
            return { ...state }
        }
        case RESET_CALCULATE: {
            return { ...state, courseList: [], priorCGPA: { CGPA: "", creditsEarned: "" } }
        }
        case DROP_COURSE: {
            const courseListUpdated = state.courseList.filter(course => Number(course.id) !== Number(action.id))
            return { ...state, courseList: courseListUpdated };
        }
        case SET_COURSE_SEARCH: {
            console.log(action.courseSearch)
            return { ...state, courseSearch: action.courseSearch };
        }
        default: return { ...state };
    };
};