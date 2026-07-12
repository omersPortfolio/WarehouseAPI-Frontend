import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsListPage from './pages/ProductsListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrdersListPage from './pages/OrdersListPage';

function App() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <div>
            <nav
                style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    borderBottom: '1px solid #ccc',
                    alignItems: 'center',
                }}
            >
                <Link to="/">Dashboard</Link>
                <Link to="/products">Products</Link>
                <Link to="/orders">Orders</Link>

                <span
                    style={{
                        marginLeft: 'auto',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                    }}
                >
                    {user ? (
                        <>
                            <span>
                                {user.username} ({user.role})
                            </span>
                            <button type="button" onClick={handleLogout}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </span>
            </nav>

            <main style={{ padding: '1rem' }}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/products" element={<ProtectedRoute><ProductsListPage /></ProtectedRoute>} />
                    <Route path="/products/:id" element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute><OrdersListPage /></ProtectedRoute>} />
                    <Route path="*" element={<div><h1>Not Found</h1></div>} />
                </Routes>
            </main>
        </div>
    );
}

export default App;