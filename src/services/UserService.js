import { baseService } from "./BaseService";

export class UserService extends baseService {
    loginService = (loginInfo) => {
        return this.post('users/login', loginInfo);
    }
    isLoggedInService = () => {
        return this.get('users/isloggedin');
    }
    registerService = (user) => {
        return this.post('users/register', user)
    }
}

export const userService = new UserService();