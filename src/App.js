import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import React, { lazy, Suspense } from 'react';

const Login = lazy(() => import('./pages/login/Login'));
const EmployeeList = lazy(() => import('./pages/employee/EmployeeList'));
const RequestList = lazy(() => import('./pages/request/RequestList'));
const UserList = lazy(() => import('./pages/user/UsersList'));

function ErrorLoadModule() {
  return (<p>No fue posible cargar el documento</p>);
}


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path='/login'
                element={<Login />}
                errorElement={<ErrorLoadModule />}
              >
              </Route>
              <Route
                path='/employees'
                element={<EmployeeList />}
                errorElement={<ErrorLoadModule />}
              >
              </Route>
              <Route
                path='/requests/:employee_id'
                element={<RequestList />}
                errorElement={<ErrorLoadModule />}
              >
              </Route>
              <Route
                path='/users'
                element={<UserList />}
                errorElement={<ErrorLoadModule />}
              >
              </Route>
              <Route
                path="*"
                element={<Navigate to="/login" replace />}
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
