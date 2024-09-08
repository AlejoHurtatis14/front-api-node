import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api/',
    timeout: 1000,
    headers: {
        "Authorization": localStorage.getItem('tokenNodeJs')
    }
});

const RequestGeneral = {
    get: (module) => {
        return instance.get(`${module}?rol_id=${localStorage.getItem('typeUser')}`);
    },
    post: (module, data) => {
        return instance.post(`${module}?rol_id=${localStorage.getItem('typeUser')}`, data);
    },
    delete: (module) => {
        return instance.delete(`${module}?rol_id=${localStorage.getItem('typeUser')}`);
    }
}

export default RequestGeneral;
