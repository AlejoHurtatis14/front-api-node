import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import React from 'react';


// Mock de los módulos y funciones necesarios
jest.mock('../../contexts/AuthContext');
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('Login Component', () => {
    const mockLogin = jest.fn();
    const mockSetCurrentUser = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        useAuth.mockReturnValue({
            login: mockLogin,
            setCurrentUser: mockSetCurrentUser,
        });
        useNavigate.mockReturnValue(mockNavigate);
    });

    /* Verificamos que cargue correctamente el modulo de login */
    test('renders login form', () => {
        render(<Login />);
        expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
    });

    /* Verificamos que se pueda ingresar valores a los campos */
    test('allows entering email and password', () => {
        render(<Login />);
        const emailInput = screen.getByLabelText(/Correo Electrónico/i);
        const passwordInput = screen.getByLabelText(/Contraseña/i);

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');
    });

    /* Boton de ver y ocultar password */
    test('toggles password visibility', () => {
        render(<Login />);
        const passwordInput = screen.getByLabelText(/Contraseña/i);
        const toggleButton = screen.getByRole('button', { name: '' });

        expect(passwordInput).toHaveAttribute('type', 'password');
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'text');
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('submits the form with correct data', async () => {
        const mockResponse = {
            data: {
                token: 'mock-token',
                usuario: { id: 1, name: 'Test User', rol_id: 2 },
            },
        };
        mockLogin.mockResolvedValue(mockResponse);

        render(<Login />);
        const emailInput = screen.getByLabelText(/Correo Electrónico/i);
        const passwordInput = screen.getByLabelText(/Contraseña/i);
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
        useNavigate.mockReturnValue(mockNavigate);

    });
});