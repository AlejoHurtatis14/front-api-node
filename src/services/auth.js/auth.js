import RequestGeneral from '../general/request-general';

const AuthService = {
    register: (data) => {
        return RequestGeneral.post('/auth/register', data);
    },
    login: (data) => {
        return RequestGeneral.post('/auth/login', data);
    },
    list: () => {
        return RequestGeneral.get('/auth/list');
    },
    deleteOne: (id) => {
        return RequestGeneral.delete('/auth/' + id)
    }
}

export default AuthService;
