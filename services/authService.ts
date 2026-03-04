'use client';

/**
 * Authentication Service
 * Handles token storage and authentication status checks.
 */

export const authService = {
    /**
     * Get the stored authentication token
     */
    getToken: (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    },

    /**
     * Check if the user is authenticated
     */
    isAuthenticated: (): boolean => {
        return !!authService.getToken();
    },

    /**
     * Log the user out
     */
    logout: (): void => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    },

    /**
     * Get the API URL from environment or default to localhost:8000
     */
    getApiUrl: (): string => {
        return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    }
};
