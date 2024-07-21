import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext( {} );

function AuthContextProvider( { children } ) {
    const [ isAuth, toggleIsAuth ] = useState( {
        isAuth: false,
        user: {username: null, role: null, speciality: null, favourites: null, shelterAnimals: [], donations: null, userPhoto: null},
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
                user: {username: null, role: null, speciality: null, favourites: null, shelterAnimals: [], donations: null, userPhoto: null},
                status: 'done',
            } );
        }
    }, [] );

    function login( JWT ) {
        console.log(localStorage.getItem( 'token' ));
        const decoded = jwtDecode( localStorage.getItem( 'token' ) );

        void fetchUserData( decoded.sub, JWT, '/profile' );
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth( {
            isAuth: false,
            user: {username: null, role: null, speciality: null, favourites: null, shelterAnimals: [], donations: null, userPhoto: null},
            status: 'done',
        } );

        console.log( 'User has been logged out!' );
        navigate( '/' );
    }

    async function sendImage(e, id, image) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', image);
        let token = localStorage.getItem( 'token' );

        try {
            const result = await axios.post(`http://localhost:8080/users/${id}/photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
                body: image,
            });
            console.log(result);
        }
        catch (e) {
            console.error( e );
        }
    }

    async function fetchUserData( id, token, redirectUrl ) {
        let dataUrl = null;

        try {
            const download = await axios.get( `http://localhost:8080/users/${id}/photo`, {
                headers: {
                    Authorization: `Bearer ${ token }`,
                },
                responseType: "arraybuffer"});
            console.log( download );
            const blob = new Blob([download.data], { type: 'image/png' });
            dataUrl = URL.createObjectURL(blob);
            console.log( dataUrl );
        }
        catch(e) {
            console.error( e );
        }

        try {
            const result = await axios.get( `http://localhost:8080/users/${ id }`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ token }`,
                },
            } );

            console.log(result.data);

            toggleIsAuth({
                user: {
                    username: result.data.username,
                    role: result.data.role,
                    speciality: result.data.speciality,
                    favourites: result.data.favourites,
                    shelterAnimals: result.data.shelterAnimals,
                    donations: result.data.donations,
                    userPhoto: dataUrl,
                },
                status: 'done',
                isAuth: true,
            } );

            if ( redirectUrl ) {
                navigate( redirectUrl );
            }

        } catch ( e ) {
            console.error( e );
            toggleIsAuth( {
                isAuth: false,
                user: {username: null, role: null, speciality: null, favourites: null, shelterAnimals: [], donations: null, userPhoto: null},
                status: 'done',
            } );
        }
    }

    const contextData = {
        isAuth,
        login,
        logout,
        sendImage,
    };

    return (
        <AuthContext.Provider value={ contextData }>
            { isAuth.status === 'done' && children }
            { isAuth.status === 'pending' && <p>Loading...</p> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;