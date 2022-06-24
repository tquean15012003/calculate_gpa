import { baseService } from "./BaseService";

export class RequestService extends baseService {
    createRequestService = (model) => {
        return this.post('requests', model)
    }
    getRequestListSentByService = (username) => {
        return this.get(`requests/sentby/${username}`)
    }
    getRequestListService = () => {
        return this.get("requests")
    }
    updateRequestService = (id, model) => {
        return this.put(`requests/${id}`, model)
    }
}

export const requestService = new RequestService();