import {createContext, useState} from "react";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [ isAuth, toggleIsAuth ] = useState({
        isAuthenticated: false,
        role: "",
        user: "",
        fetchUserData,
    } );

    async function fetchUserData( username ) {
        try {
            const result = await axios.get(`http://localhost:8080/users/${username}`);

            toggleIsAuth({
                isAuthenticated: true,
                user: result.data.username,
                role: result.data.role,
            });
            console.log(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    return <AuthContext.Provider value={isAuth}>
        {children}
    </AuthContext.Provider> }

export default AuthContextProvider;