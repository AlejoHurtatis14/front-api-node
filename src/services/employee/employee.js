import RequestGeneral from '../general/request-general';

const EmployeeService = {
    register: (data) => {
        return RequestGeneral.post('/employee/register', data);
    },
    list: (data) => {
        return RequestGeneral.get('/employee/list' + (data || ''));
    },
    getOne: (id) => {
        return RequestGeneral.get('/employee/' + id);
    }
}

export default EmployeeService;
