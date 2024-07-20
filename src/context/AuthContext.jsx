import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext( {} );

function AuthContextProvider( { children } ) {
    const [ isAuth, toggleIsAuth ] = useState( {
        isAuth: false,
        user: {username: null, role: null, speciality: null, favourites: null, shelterAnimals: [], donations: null},
        status: 'pending',
    } );
    const navigate = useNavigate();

    useEffect( () => {
        const token = localStorage.getItem( 'token' );

        console.log( token === true );
        if ( token === true ) {
            console.log( token );
            const decoded = jwtDecode( token );
            void fetchUserData( decoded.sub, token );
        } else {
            toggleIsAuth( {
                isAuth: false,
                user: {username: null, role: null, speciality: null, favourites: null, shelterAnimals: []},
                status: 'done',
            } );
        }
    }, [] );

    function login( JWT ) {
        localStorage.setItem( 'token', JWT );
        const decoded = jwtDecode( JWT );

        void fetchUserData( decoded.sub, JWT, '/profile' );
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth( {
            isAuth: false,
            user: null,
            status: 'done',
        } );

        console.log( 'User has been logged out!' );
        navigate( '/' );
    }

    async function fetchUserData( id, token, redirectUrl ) {
        try {
            const result = await axios.get( `http://localhost:8080/users/${ id }`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ token }`,
                },
            } );

            console.log( result.data );
            toggleIsAuth({
                isAuth: true,
                user: {username: result.data.username,
                    role: result.data.role,
                    speciality: result.data.speciality,
                    favourites: result.data.favouriteAnimals,
                    shelterAnimals: result.data.shelterAnimals,
                    donations: result.data.donations},
                status: 'done',
            } );

            if ( redirectUrl ) {
                navigate( redirectUrl );
            }

        } catch ( e ) {
            console.error( e );
            toggleIsAuth( {
                isAuth: false,
                user: null,
                status: 'done',
            } );
        }
    }

    const contextData = {
        isAuth,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={ contextData }>
            { isAuth.status === 'done' && children }
            { isAuth.status === 'pending' && <p>Loading...</p> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;