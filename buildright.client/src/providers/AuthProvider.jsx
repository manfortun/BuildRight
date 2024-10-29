import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import { AUTH_COOKIE } from "../util/constants";
import { fetchData, fetchOptions } from "../services/apiService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState({
        user: null,
        loading: true,
        accessToken: "",
        isLoggedIn: false
    });

    useEffect(() => {
        let token = getToken();

        if (token) {
            saveToken(token);
            setSession(current => ({ ...current, accessToken: token, loading: false }));
        } else {
            logout();
        }
    }, []);

    const logout = () => {
        Cookies.remove(AUTH_COOKIE);
        setSession(current => ({ ...current, user: null, accessToken: "", isLoggedIn: false }));
    }

    const saveToken = (token) => {
        try {
            const now = new Date();
            const expiration = new Date(now.getTime() + 3600 * 1000);
            Cookies.set(AUTH_COOKIE, token, { expires: expiration });

            const decodedUser = jwtDecode(token);
            setSession(current => ({ ...current, user: decodedUser, isLoggedIn: true }));
        } catch (err) {
            console.error(err);
        }
    }

    const getToken = () => {
        return Cookies.get(AUTH_COOKIE);
    }

    const getAuthHeader = () => {
        return {
            headers: {
                'Authorization': `Bearer ${session.accessToken}`
            }
        };
    }

    const signup = async ({
        email,
        username,
        password: {
            password,
            confirmPassword
        },
        userInformation: {
            firstName,
            lastName
        }
    }) => {
        const options = fetchOptions('POST', {
            email,
            username,
            password: {
                password,
                confirmPassword
            },
            userInformation: {
                firstName,
                lastName
            }
        });

        const { status, response } = await fetchData('Account/Signup', options);

        if (status && response.token) {
            saveToken(response.token);
        }

        return { status, response };
    }

    const login = async ({ email, password }) => {
        const options = fetchOptions('POST', { email, password })
        const { status, response } = await fetchData('Account/Login', options);

        if (status && response.token) {
            saveToken(response.token);
        }

        return { status, response };
    }

    return (
        <AuthContext.Provider value={{ session, getAuthHeader, signup, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}