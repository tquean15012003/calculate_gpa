import { SET_REQUEST_LIST, SET_REQUEST_LIST_SENT_BY } from "../constants/RequestsConsts";

const stateDefault = {
    requestList: [],
    requestListSentBy: []
};

export const RequestReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_REQUEST_LIST_SENT_BY: {
            return { ...state, requestListSentBy: action.requestListSentBy };
        }
        case SET_REQUEST_LIST: {
            return { ...state, requestList: action.requestList };
        }
        default: return { ...state };
    };
};