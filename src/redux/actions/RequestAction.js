import { requestService } from "../../services/RequestService";
import { USER } from "../../utils/settings/config";
import { SET_REQUEST_LIST, SET_REQUEST_LIST_SENT_BY } from "../constants/RequestsConsts";
import { addCourseAdminAction } from "./AdminActions";

export const updateRequestListSentBy = (requestListSentBy) => ({
    type: SET_REQUEST_LIST_SENT_BY,
    requestListSentBy
})

export const updateRequestList = (requestList) => ({
    type: SET_REQUEST_LIST,
    requestList
})

export const getRequestListSentByAction = () => {
    return async (dispatch, getState) => {
        const username = await JSON.parse(localStorage.getItem(USER)).username
        try {
            const { data } = await requestService.getRequestListSentByService(username)
            dispatch(updateRequestListSentBy(data.requestList))
        } catch (errors) {
            console.log(errors)
        }
    }
}

export const getRequestListAction = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await requestService.getRequestListService()
            dispatch(updateRequestList(data.requestList))
        } catch (errors) {
            console.log(errors)
        }
    }
}

export const sendRequestAction = (values) => {
    return async (dispatch, getState) => {
        const sentBy = await JSON.parse(localStorage.getItem(USER)).username
        const data = JSON.stringify(values);
        const requestInfo = {
            sentBy,
            data
        }
        try {
            await requestService.createRequestService(requestInfo);
            dispatch(getRequestListSentByAction())
            alert("Sent request successfully")
        } catch (errors) {
            alert(errors)
        }
    }
}

export const rejectRequestAction = (id) => {
    return async (dispatch, getState) => {
        const model = {
            resBy: JSON.parse(localStorage.getItem(USER)).username,
            isApproved: "false"
        }
        try {
            await requestService.updateRequestService(id, model);
            await dispatch(getRequestListAction())
            alert("Reject request successfully")
        } catch (errors) {
            alert(errors)
        }
    }
}

export const approveRequestAction = (id) => {
    return async (dispatch, getState) => {
        const model = {
            resBy: JSON.parse(localStorage.getItem(USER)).username,
            isApproved: "true"
        }
        try {
            const { data } = await requestService.updateRequestService(id, model);
            const courseInfo = await JSON.parse(data.request.data)
            await dispatch(addCourseAdminAction(courseInfo))
            await dispatch(getRequestListAction())
            alert("Approve request successfully")
        } catch (errors) {
            alert(errors)
        }
    }
}