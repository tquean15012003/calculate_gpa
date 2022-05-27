import Axios from "axios"
import { DOMAIN } from '../utils/settings/config'
import { TOKEN } from "../utils/settings/config"

export class baseService {
    get = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: { 'token': localStorage.getItem(TOKEN) }
        })
    }

    post = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,
            headers: { "token": localStorage.getItem(TOKEN) }
        })
    }

    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: { "token": localStorage.getItem(TOKEN) }
        })
    }

    delete = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers: { "token": localStorage.getItem(TOKEN) }
        })
    }
}