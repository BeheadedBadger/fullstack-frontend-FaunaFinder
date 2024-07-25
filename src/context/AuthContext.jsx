import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import React from "react";


export const AuthContext = createContext( {} );

function AuthContextProvider( { children } ) {
    const [ isAuth, setAuth ] = useState( {
        loggedIn: false,
        user: {
            username : "",
            role : "",
            speciality: "",
            favourites: [],
            shelterAnimals: [],
            donations: [],
            userPhoto: "",
        },
        status: 'pending',
    } );

    const navigate = useNavigate();

    useEffect( () => {
        const token = localStorage.getItem('token');

        if (token !== null && token !== "null") {
            const decoded = jwtDecode(token);
            if (decoded.sub != null) {
                void fetchUserData(decoded.sub, token);
            }

        } else {
            setAuth({
                loggedIn: false,
                user: {
                    username : "",
                    role : "",
                    speciality: "",
                    favourites: [],
                    shelterAnimals: [],
                    donations: [],
                    userPhoto: "",},
                status: 'done',
            });
        }
    }, [] );

    async function login(JWT) {
        localStorage.setItem("token", JWT);

        if (JWT !== null) {
            const decoded = jwtDecode(JWT);
            await void fetchUserData(decoded.sub, JWT);
            navigateToProfile();
        }
    }

    function logout() {
        localStorage.clear();
        setAuth( {
            loggedIn: false,
            user: {
                username : "",
                role : "",
                speciality: "",
                favourites: [],
                shelterAnimals: [],
                donations: [],
                userPhoto: "",
            },
            status: 'done',
        } );

        console.log( 'User has been logged out!' );
        navigate( '/' );
    }

    async function fetchUserData( id, token ) {
        let dataUrl = "";

        console.log(id);

        try {
            const download = await axios.get( `http://localhost:8080/users/${id}/photo`, {
                headers: {
                    Authorization: `Bearer ${ token }`,
                },
                responseType: "arraybuffer"});
            const blob = new Blob([download.data], { type: 'image/png' });
            dataUrl = URL.createObjectURL(blob);
        }
        catch(e) {
            console.error( e );
        }

        try {
            const result = await axios.get( `http://localhost:8080/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ token }`,
                },
            } );

            let userData = result.data;


            localStorage.setItem("user_username", result.data.username);
            localStorage.setItem("user_role", result.data.role);
            localStorage.setItem("loggedin", true);


            setAuth( {
                isAuth,
                loggedIn : true,
                user: {
                    username : userData.username,
                    role : userData.role,
                    speciality: userData.speciality,
                    favourites: userData.favourites,
                    shelterAnimals: userData.shelterAnimals,
                    donations: userData.donations,
                    userPhoto: dataUrl,
                },
                status: "done",
            });

        } catch ( e ) {
            console.log( "error occurred collecting user data" );
            setAuth( {
                loggedIn: false,
                user: {
                    username : "",
                    role : "",
                    speciality: "",
                    favourites: [],
                    shelterAnimals: [],
                    donations: [],
                    userPhoto: "",
                },
                status: 'done',
            } );
        }
    }

    const navigateToProfile = () => {
        navigate('/profile');
    }

    const contextData = {
        isAuth : isAuth,
        login : login,
        logout : logout,
        loggedIn : isAuth.loggedIn,
        user : isAuth.user,
        fetchUserData : fetchUserData,
    };

    return (
        <AuthContext.Provider value={ contextData }>
            { (isAuth.status === 'done') && children }
            { (isAuth.status === 'pending') && <p>Loading...</p> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;