import { baseService } from "./BaseService";

export class UserService extends baseService {
    loginService = (loginInfo) => {
        return this.post('users/login', loginInfo);
    }
}

export const userService = new UserService();