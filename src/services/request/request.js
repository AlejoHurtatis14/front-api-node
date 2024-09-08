import RequestGeneral from '../general/request-general';

const RequestService = {
    register: (data) => {
        return RequestGeneral.post('/request/register', data);
    },
    list: (id, data) => {
        return RequestGeneral.get(`/request/list/${id}${(data || '')}`);
    },
    getOne: (id) => {
        return RequestGeneral.get('/request/' + id);
    },
    deleteOne: (id) => {
        return RequestGeneral.delete('/request/' + id)
    }
}

export default RequestService;
