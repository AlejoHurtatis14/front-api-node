import { faFile, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../../services/employee/employee';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function CreateEmployee({ getEmployees }) {
    const [incomeDate, setIncomeDate] = useState('');
    const [name, setName] = useState('');
    const [salary, setSalary] = useState('');

    const saveEmploye = (e) => {
        e.preventDefault();
        let data = {
            income_date: incomeDate,
            name: name,
            salary: salary
        }
        EmployeeService.register(data).then(({ data }) => {
            getEmployees();
            document.getElementById('cancelSaveEmployee').click();
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
                        <h1 className="modal-title fs-5" id="employeeModalLabel">Registrar empleado</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="saveEmployee" onSubmit={saveEmploye}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Fecha Ingreso</label>
                                <input
                                    type="date"
                                    className="form-control rounded-pill"
                                    id="email"
                                    value={incomeDate}
                                    onChange={(e) => setIncomeDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Nombre</label>
                                <input
                                    type="string"
                                    className="form-control rounded-pill"
                                    id="email"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Salario</label>
                                <input
                                    type="number"
                                    className="form-control rounded-pill"
                                    id="email"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    required
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn" data-bs-dismiss="modal" id="cancelSaveEmployee">Cancelar</button>
                        <button type="submit" form='saveEmployee' className="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmployeeList() {

    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState('');
    const history = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = () => {
        EmployeeService.list().then(({ data }) => {
            setEmployees(data.data)
        }).catch(error => {
            toast(error.response.data.msg, { type: 'error' });
            console.log('Error en lista de empleados ', error);
        });
    }

    const transformDate = (fechaISO) => {
        const fecha = new Date(fechaISO);
        const dia = fecha.getUTCDate();
        const mes = fecha.getUTCMonth() + 1;
        const año = fecha.getUTCFullYear();
        return `${dia}/${mes}/${año}`;
    }

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(filter.toLowerCase())
    );

    const goTo = (id) => {
        history("/requests/" + id);
    }

    return (
        <div className='container mt-5'>
            <div className='d-flex justify-content-between mb-3'>
                <div className='text-dark fw-bold'>
                    <p className='h4'>Empleados</p>
                </div>
                {
                    currentUser && currentUser.rol_id === 1 ? (
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#employeeModal">
                            <span className='me-2'>Crear Empleado</span>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    ) : null
                }
            </div>

            {/* Buscador */}
            <div className='d-flex justify-content-end mb-3'>
                <input
                    type="string"
                    className="form-control rounded-pill w-25"
                    id="email"
                    placeholder="Buscar empleado"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    required
                />
            </div>

            {/* Lista de empleados */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fecha Ingreso</th>
                        <th scope="col">Salario</th>
                        <th scope="col" className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee, index) => (
                        <tr key={employee.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{employee.name}</td>
                            <td>{transformDate(employee.income_date)}</td>
                            <td>{employee.salary}</td>
                            <td className='text-center'>
                                <button onClick={() => goTo(employee.id)} type='button' title='Ver Solicitudes' className='btn btn-secondary'>
                                    <FontAwesomeIcon icon={faFile} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <CreateEmployee getEmployees={getEmployees} />
        </div>
    );
}

export default EmployeeList;