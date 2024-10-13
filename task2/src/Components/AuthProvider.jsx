import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ accessToken: null, refreshToken: null });
    const navigate = useNavigate(); 

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (storedAccessToken && storedRefreshToken) {
            setAuth({
                accessToken: storedAccessToken,
                refreshToken: storedRefreshToken,
            });
        }
    }, []);

    const refreshAccessTokens = () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            axios.post("https://auth-backend-138t.onrender.com/api/v1/users/refresh-token", {
                refreshToken: refreshToken
            })
            .then((response) => {
                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                setAuth((prevState) => ({
                    ...prevState,
                    accessToken: newAccessToken
                }));
            })
            .catch((error) => {
                logout(); 
            });
        }
    };

    const logout = () => {
        const accessToken = localStorage.getItem('accessToken');
        console.log('Access Token:', accessToken);
        if (!accessToken) {
            console.error('No access token available for logout');
            return;
        }
    
        axios.post('https://auth-backend-138t.onrender.com/api/v1/users/logout', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}` // Correct format for Authorization header
            }
        })
        .then(() => {
            // Clear tokens from localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            // Redirect to login page
            navigate('/login');
        })
        .catch((error) => {
            console.error('Logout failed:', error.response?.data || error.message);
            // Handle logout error
        });
    };
    

    return (
        <AuthContext.Provider value={{ auth, setAuth, refreshAccessTokens, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
