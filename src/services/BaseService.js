import Axios from "axios"
import {DOMAIN} from '../util/settings/config'

export class baseService {
    get = (url) => {
        return Axios({
            url:`${DOMAIN}/${url}`,
            method:'GET',
        })
    }

    post = (url,model) => {
        return Axios({
            url:`${DOMAIN}/${url}`,
            method:'POST',
            data:model,
        }) 
    }

    put = (url,model) => {
        return  Axios({
            url:`${DOMAIN}/${url}`,
            method:'PUT',
            data:model,
        }) 
    }

    delete = (url) => {
        return Axios({
            url:`${DOMAIN}/${url}`,
            method:'DELETE',
        })
    }
}