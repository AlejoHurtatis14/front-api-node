import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import EmployeeList from './EmployeeList';
import React from 'react';

let mockCurrentUser;

// Mock de los módulos y funciones necesarios
jest.mock('../../contexts/AuthContext', () => ({
    useAuth: () => ({
        currentUser: mockCurrentUser,
    }),
}));
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('Employee Component', () => {

    const mockNavigate = jest.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
        mockCurrentUser = null;
    });

    /* Verificamos que cargue correctamente el modulo de empleados */
    test('renders employee view', () => {
        render(<EmployeeList />);
        expect(screen.getByText(/Empleados/i)).toBeInTheDocument();
    });

    /* Verificamos que cargue correctamente el formulario de agegar solicitud */
    test('render form create employee', () => {
        mockCurrentUser = { rol_id: 1 };
        render(<EmployeeList />);
        const btnOpenModal = screen.getByRole('button', { name: /Crear Empleado/i });
        fireEvent.click(btnOpenModal);
        expect(screen.getByText(/Registrar empleado/i)).toBeInTheDocument();
    });
});