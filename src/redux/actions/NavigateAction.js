import { SET_NAVIGATE } from "../constants/NavigateConsts";

export const setNavigateAction = (navigate) => ({
    type: SET_NAVIGATE,
    navigate
})