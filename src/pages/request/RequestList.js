import { faArrowAltCircleLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import RequestService from '../../services/request/request';

function CreateRequest({ getRequests, employee_id }) {

    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [resume, setResume] = useState('');

    const saveRequest = (e) => {
        e.preventDefault();
        let data = { code, description, resume, employee_id };

        RequestService.register(data).then(({ data }) => {
            getRequests();
            toast(data.msg, { type: 'success' });
            document.getElementById('cancelSaveRequest').click();
        }).catch(error => {
            toast(error.response.data.msg, { type: 'error' });
            console.log("Error login ", error.response.data.msg);
        });
    }

    return (
        <div className="modal fade" id="requestModal" tabIndex="-1" aria-labelledby="requestModalLabel" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="requestModalLabel">Registrar Solicitud</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="saveEmployee" onSubmit={saveRequest}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Código</label>
                                <input
                                    type="text"
                                    maxLength={50}
                                    className="form-control rounded-pill"
                                    id="email"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Descripción</label>
                                <input
                                    type="text"
                                    maxLength={50}
                                    className="form-control rounded-pill"
                                    id="email"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Resumen</label>
                                <input
                                    type="text"
                                    maxLength={50}
                                    className="form-control rounded-pill"
                                    id="email"
                                    value={resume}
                                    onChange={(e) => setResume(e.target.value)}
                                    required
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn" data-bs-dismiss="modal" id="cancelSaveRequest">Cancelar</button>
                        <button type="submit" form='saveEmployee' className="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RequestList() {
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState('');
    const { employee_id } = useParams();
    const history = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        getRequests();
    }, []);

    const getRequests = () => {
        RequestService.list(employee_id).then(({ data }) => {
            setRequests(data.data)
        }).catch(error => {
            toast(error.response.data.msg, { type: 'error' });
            console.log('Error en lista de solicitudes ', error);
        });
    }

    const deleteRequests = (id) => {
        RequestService.deleteOne(id).then(({ data }) => {
            toast(data.msg, { type: 'success' });
            getRequests();
        }).catch(error => {
            toast(error.response.data.msg, { type: 'error' });
            console.log('Error en lista de solicitudes ', error);
        });
    }

    const filteredRequests = requests.filter(request =>
        request.code.toLowerCase().includes(filter.toLowerCase())
    );

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
                    <p className='h4'>Solicitudes</p>
                </div>
                {
                    currentUser && currentUser.rol_id === 1 ? (
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#requestModal">
                            <span className='me-2'>Crear Solicitud</span>
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
                    placeholder="Buscar solicitud"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    required
                />
            </div>

            {/* Lista de solicitudes */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Código</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Resumen</th>
                        {
                            currentUser && currentUser.rol_id === 1 ? (
                                <th scope="col" className='text-center'>Acciones</th>
                            ) : null
                        }
                    </tr>
                </thead>
                <tbody>
                    {filteredRequests.map((request, index) => (
                        <tr key={request.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{request.code}</td>
                            <td>{request.description}</td>
                            <td>{request.resume}</td>
                            {
                                currentUser && currentUser.rol_id === 1 ? (
                                    <td className='text-center'>
                                        <button onClick={(e) => deleteRequests(request.id)} type='button' title='Ver Solicitudes' className='btn btn-danger'>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                ) : null
                            }
                        </tr>
                    ))}
                </tbody>
            </table>

            <CreateRequest getRequests={getRequests} employee_id={employee_id} />
        </div>
    );
}

export default RequestList;