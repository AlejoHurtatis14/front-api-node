import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { faRightFromBracket, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navbar() {

    const history = useNavigate();
    const { currentUser, logout, setCurrentUser } = useAuth();
    const dataUser = localStorage.getItem('userNodeJs');
    if (!currentUser && dataUser) {
        setTimeout(() => {
            setCurrentUser(JSON.parse(atob(dataUser)));
            history('/employees');
        }, 500);
    }

    const cerrarSesion = () => {
        logout();
        history('/login');
    }

    const goToUsers = () => {
        history('/users');
    }

    return (
        <nav>
            {currentUser && (
                <div className='bg-light w-100 d-flex justify-content-end align-items-center py-2'>
                    {
                        currentUser.rol_id === 1 ? (
                            <button type='button' className='btn btn-info me-4' onClick={goToUsers}>
                                <span className='me-2'>Usuarios</span>
                                <FontAwesomeIcon icon={faUsers} />
                            </button>
                        ) : null
                    }
                    <div className='w-auto p-3 d-flex justify-content-end'>
                        <FontAwesomeIcon onClick={cerrarSesion} size='xl' icon={faRightFromBracket} style={{ cursor: 'pointer' }} />
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;