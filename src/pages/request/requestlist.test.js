import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import RequestList from './RequestList';

let mockCurrentUser;

// Mock de los módulos y funciones necesarios
jest.mock('../../contexts/AuthContext', () => ({
    useAuth: () => ({
        currentUser: mockCurrentUser,
    }),
}));
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useParams: () => ({
        employee_id: 1,
    }),
}));

describe('Request Component', () => {

    const mockNavigate = jest.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
        mockCurrentUser = null;
    });

    /* Verificamos que cargue correctamente el modulo de Solicitudes */
    test('renders request view', () => {
        render(<RequestList />);
        expect(screen.getByText(/Solicitudes/i)).toBeInTheDocument();
    });

    /* Verificamos que cargue correctamente el formulario de agegar solicitud */
    test('render form create request', () => {
        mockCurrentUser = { rol_id: 1 };
        render(<RequestList />);
        const btnOpenModal = screen.getByRole('button', { name: /Crear Solicitud/i });
        fireEvent.click(btnOpenModal);
        expect(screen.getByText(/Registrar Solicitud/i)).toBeInTheDocument();
    });
});