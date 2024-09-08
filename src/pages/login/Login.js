import { faEye, faEyeSlash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import imgLogin from '../../assets/undraw_Code_review_re_woeb.png';
import React, { useState } from 'react';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, setCurrentUser } = useAuth();
    const history = useNavigate();

    const execSubmit = (e) => {
        e.preventDefault();
        login(username, password).then(({ data }) => {
            localStorage.setItem('tokenNodeJs', data.token);
            localStorage.setItem('typeUser', data.usuario.rol_id);
            localStorage.setItem('userNodeJs', btoa(JSON.stringify(data.usuario)));
            setCurrentUser(data.usuario);
            history('/employees');
        }).catch(error => {
            toast(error.response.data.msg, { type: 'error' });
            console.log("Error login ", error.response.data.msg);
        });
    };

    return (
        <div className='row m-2' style={{ minHeight: '98vh' }}>
            <div className='col-7 align-items-center d-flex justify-content-center'>
                <img src={imgLogin} width="50%" alt='Imagen' />
            </div>
            <div className='col-5 px-5'>
                <div className='h-100 d-flex flex-column justify-content-center'>
                    <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
                    <form onSubmit={execSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control rounded-pill"
                                id="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control rounded-start-pill"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    className="btn btn-outline-secondary rounded-end-pill"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary rounded-pill">
                                <span className='me-2'>Iniciar Sesión</span>
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

