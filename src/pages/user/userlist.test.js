import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import UsersList from './UsersList';


// Mock de los módulos y funciones necesarios
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn()
}));

describe('User Component', () => {

    const mockNavigate = jest.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
    });

    /* Verificamos que cargue correctamente el modulo de usuarios */
    test('renders user view', () => {
        render(<UsersList />);
        expect(screen.getByText(/Usuarios/i)).toBeInTheDocument();
    });

    /* Verificamos que cargue correctamente el formulario de agegar usuario */
    test('render form create user', () => {
        render(<UsersList />);
        const btnOpenModal = screen.getByRole('button', { name: /Crear Usuario/i });
        fireEvent.click(btnOpenModal);
        expect(screen.getByText(/Registrar usuario/i)).toBeInTheDocument();
    });
});