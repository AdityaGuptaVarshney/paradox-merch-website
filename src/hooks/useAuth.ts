// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

export function useAuth() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Initialize token from localStorage
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const refreshToken = async () => {
        try {
            // Implement your token refresh logic here
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Failed to refresh token');

            const data = await response.json();
            setToken(data.token);
            localStorage.setItem('token', data.token);

            return data.token;
        } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        // Additional cleanup as needed
    };

    return {
        token,
        setToken,
        refreshToken,
        logout,
        isAuthenticated: !!token,
    };
}
