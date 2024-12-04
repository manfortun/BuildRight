import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Router from './Router';
import PageNotFound from './pages/PageNotFound';
import * as AdminHome from './pages/admin/Home';
import Login from './pages/admin/Login';
import * as CustHome from './pages/customer/Home';
import * as CustStore from './pages/customer/Store';
import { AuthProvider } from './providers/AuthProvider';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login /> } />
                    <Route path="/" element={<Router />} >
                        <Route index element={<CustHome.default />} />
                        <Route path="/store" element={<CustStore.default />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                    <Route path="/admin" element={<Router isAdmin={true} />}>
                        <Route index element={<AdminHome.default />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;