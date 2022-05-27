import { userService } from "../../services/UserService";
import { TOKEN, USER } from "../../utils/settings/config";
import _ from 'lodash'

export const loginAction = (loginInfo) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await userService.loginService(loginInfo)
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(USER)
            localStorage.setItem(TOKEN, data.token);
            localStorage.setItem(USER, JSON.stringify(data.user));
            const { navigate } = getState().NavigateReducer;
            navigate("/home", { replace: false });
        } catch (errors) {
            alert(errors.response.data.message);
        }
    };
}

export const isLoggedInAction = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await userService.isLoggedInService();
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(USER)
            localStorage.setItem(TOKEN, data.token);
            localStorage.setItem(USER, JSON.stringify(data.user));
            const { navigate } = getState().NavigateReducer;
            navigate("/home", { replace: false });
        } catch (errors) {
            console.log('errors', errors);
        }
    }
}

export const registerAction = (user) => {
    return async (dispatch, getState) => {
        try {
            await userService.registerService(user);
            alert("Register successfully")
            const { navigate } = getState().NavigateReducer;
            navigate("/", { replace: false });
        } catch (errors) {
            alert(_.capitalize(errors.response.data.errors[0].message))
        }
    }
}