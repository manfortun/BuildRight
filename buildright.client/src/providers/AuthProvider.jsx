import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import { AUTH_COOKIE, BASE_URL_AUTH, BASE_URL_CONTENT } from "../util/constants";
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
        } else {
            logout();
        }
    }, []);

    useEffect(() => {
        const testing = async () => {

            if (session.isLoggedIn) {

                const authHeader = getAuthHeader();

                const options = fetchOptions(undefined, 'GET', authHeader);

                const { response, status } = await fetchData(BASE_URL_CONTENT, 'Services/TestAuthorize', options);

                console.log('Status: ', status, 'Response: ', response);
            }
        };

        testing();
    }, [session]);

    const logout = () => {
        Cookies.remove(AUTH_COOKIE);
        setSession(current => ({ ...current, user: null, accessToken: "", loading: false, isLoggedIn: false }));
    }

    const saveToken = (token) => {
        try {
            const now = new Date();
            const expiration = new Date(now.getTime() + 3600 * 1000);
            Cookies.set(AUTH_COOKIE, token, { expires: expiration });

            const decodedUser = jwtDecode(token);
            setSession(current => ({ ...current, user: decodedUser, loading: false, isLoggedIn: true }));
        } catch (err) {
            console.error(err);
        }
    }

    const getToken = () => {
        return Cookies.get(AUTH_COOKIE);
    }

    const getAuthHeader = () => {
        return {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
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

        const { status, response } = await fetchData(BASE_URL_AUTH, 'Auth/Signup', options);

        if (status && response.token) {
            saveToken(response.token);
        }

        return { status, response };
    }

    const login = async ({ email, password }) => {
        const options = fetchOptions({ email, password }, 'POST');
        const { status, response } = await fetchData(BASE_URL_AUTH, 'Auth/Login', options);

        if (status && response.token) {
            saveToken(response.token);
        }

        return { status, response };
    }

    if (session.loading) {
        return <p>Loading...</p>;
    }

    return (
        <AuthContext.Provider value={{ session, getAuthHeader, signup, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}