import {useState } from 'react';
import * as React from "react";
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const loginMutation = useLogin();
    
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>)
    {
        e.preventDefault();
        setError('');
        
        if (!username || !password) {
            setError('username and password are required.');
            return;
        }
        
        loginMutation.mutate(
            {username, password},
            {
                onSuccess: () => {
                    navigate('/');
                },
                onError: () => {
                    setError('Login failed. Check your credentials.')
                }
            }
        )
        
        console.log('Would log in as:', { username, password });
    }

    return (
        <div style={{ maxWidth: '20rem' }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '0.75rem' }}>
                    <label htmlFor="username" style={{ display: 'block' }}>Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        disabled={loginMutation.isPending}
                    />
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                    <label htmlFor="password" style={{ display: 'block' }}>Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        disabled={loginMutation.isPending}
                    />
                </div>

                {error && (
                    <div style={{ color: 'red', marginBottom: '0.75rem' }}>{error}</div>
                )}

                <button type="submit" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? 'Logging in…' : 'Log in'}
                </button>
            </form>
        </div>
    );
}