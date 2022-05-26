import { userService } from "../../services/UserService";

export const loginAction = (loginInfo) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await userService.loginService(loginInfo)
            localStorage.setItem("token", JSON.stringify(data.token));
            localStorage.setItem("user", JSON.stringify(data.user));
            const { navigate } = getState().NavigateReducer;
            navigate("/home", {replace: "false"});
        } catch (errors) {
            console.log('errors', errors);
        }
    };
}