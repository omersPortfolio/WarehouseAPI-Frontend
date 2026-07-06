import {useState } from 'react';
import * as React from "react";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>)
    {
        e.preventDefault();
        setError('');
        
        if (!username || !password) {
            setError('username and password are required.');
            return;
        }
        
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
                    />
                </div>

                {error && (
                    <div style={{ color: 'red', marginBottom: '0.75rem' }}>{error}</div>
                )}

                <button type="submit">Log in</button>
            </form>
        </div>
    );
}