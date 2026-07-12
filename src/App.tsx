import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsListPage from './pages/ProductsListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrdersListPage from './pages/OrdersListPage';

function App() {
    const { user, logout } = useAuth();

    return (
        <div>
            <nav className="nav">
                <Link to="/">Dashboard</Link>
                <Link to="/products">Products</Link>
                <Link to="/orders">Orders</Link>

                <span className="nav-user">
                    {user ? (
                        <>
                            <span>
                                {user.username} ({user.role})
                            </span>
                            <button type="button" onClick={logout}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </span>
            </nav>

            <main className="main">
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