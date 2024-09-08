import { faArrowAltCircleLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.js/auth';
import React, { useState, useEffect } from 'react';

const roles = [{
    id: 1, title: "Administrador"
}, {
    id: 2, title: "Empleado"
}]

function CreateEmployee({ getUsers }) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [rolId, setRolId] = useState(roles[0].id);

    const saveUser = (e) => {
        e.preventDefault();
        let data = { email, name, password, rol_id: rolId }

        AuthService.register(data).then(({ data }) => {
            getUsers();
            document.getElementById('cancelSaveUser').click();
            toast(data.msg, { type: 'success' });
        }).catch(error => {
            toast(error.response.data.msg, { type: 'error' });
            console.log("Error login ", error.response.data.msg);
        });
    }

    return (
        <div className="modal fade" id="employeeModal" tabIndex="-1" aria-labelledby="employeeModalLabel" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="employeeModalLabel">Registrar usuario</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="saveUser" onSubmit={saveUser}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Nombre</label>
                                <input
                                    type="string"
                                    className="form-control rounded-pill"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Usuario / Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control rounded-pill"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control rounded-pill"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Tipo de usuario</label>
                                <select onChange={(e) => setRolId(e.target.value)} value={rolId} className="form-select rounded-pill" aria-label="Default select example">
                                    {roles.map((rol) => (
                                        <option key={rol.id} value={rol.id}>{rol.title}</option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn" data-bs-dismiss="modal" id="cancelSaveUser">Cancelar</button>
                        <button type="submit" form='saveUser' className="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmployeeList() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const history = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        AuthService.list().then(({ data }) => {
            setUsers(data.data)
        }).catch(error => {
            toast(error.response.data.msg, { type: 'error' });
            console.log('Error en lista de usuarios ', error);
        });
    }

    const deleteUser = (id) => {
        AuthService.deleteOne(id).then(({ data }) => {
            toast(data.msg, { type: 'success' });
            getUsers();
        }).catch(error => {
            toast(error.response.data.msg, { type: 'error' });
            console.log('Error en lista de usuarios ', error);
        });
    }

    const goBack = () => {
        history('/employees');
    }

    return (
        <div className='container mt-5'>
            <div className='d-flex justify-content-between mb-3'>
                <button onClick={() => goBack()} type="button" className="btn btn-secondary">
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    <span className='ms-2'>Regresar</span>
                </button>
            </div>

            <div className='d-flex justify-content-between mb-3'>
                <div className='text-dark fw-bold'>
                    <p className='h4'>Usuarios</p>
                </div>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#employeeModal">
                    <span className='me-2'>Crear Usuario</span>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>

            {/* Buscador */}
            <div className='d-flex justify-content-end mb-3'>
                <input
                    type="string"
                    className="form-control rounded-pill w-25"
                    id="email"
                    placeholder="Buscar usuario"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    required
                />
            </div>

            {/* Lista de usuario */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Nombre</th>
                        <th scope="col" className='text-center'>Tipo</th>
                        <th scope="col" className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((employee, index) => (
                        <tr key={employee.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{employee.email}</td>
                            <td>{employee.name}</td>
                            <td className='text-center'>
                                <button className={'btn ' + (employee.rol_id === 1 ? 'btn-info' : "btn-secondary")}>
                                    {(employee.rol_id === 1 ? 'Administrador' : "Empleado")}
                                </button>
                            </td>
                            <td className='text-center'>
                                <button onClick={() => deleteUser(employee.id)} type='button' title='Eliminar usuario' className='btn btn-danger'>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <CreateEmployee getUsers={getUsers} />
        </div>
    );
}

export default EmployeeList;