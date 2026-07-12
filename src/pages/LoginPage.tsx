import { useState, type SubmitEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { user, login } = useAuth();
    const loginMutation = useLogin();

    if (user) {
        return <Navigate to="/" replace />;
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Username and password are required.');
            return;
        }

        loginMutation.mutate(
            { username, password },
            {
                onSuccess: (data) => {
                    login(data.token);
                },
                onError: () => {
                    setError('Login failed. Check your credentials.');
                },
            }
        );
    }

    return (
        <div className="form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        disabled={loginMutation.isPending}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        disabled={loginMutation.isPending}
                    />
                </div>

                {error && <div className="form-error">{error}</div>}

                <button type="submit" className="primary" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? 'Logging in…' : 'Log in'}
                </button>
            </form>
        </div>
    );
}