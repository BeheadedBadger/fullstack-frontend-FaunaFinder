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

        console.log(token);
        if (token !== null && token !== "null") {
            const decoded = jwtDecode(token);
            if (decoded.sub != null) {
                void fetchUserData(decoded.sub, token);
            }

            console.log("Did find token");

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

            console.log("Failed to get token.")
        }
    }, [localStorage.getItem('token')] );

    function login( JWT ) {
        localStorage.setItem("token", JWT);

        console.log(JWT);
        if (JWT !== null) {
            const decoded = jwtDecode(JWT);
            console.log(decoded.sub, JWT);

            void fetchUserData(decoded.sub, JWT, '/profile');
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

    async function fetchUserData( id, token, redirectUrl ) {
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
            console.log( "Added image" );
            console.log(dataUrl);
        }
        catch(e) {
            console.log("Did not find image")
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
            console.log( "Collected user data" );

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

            console.log(userData.username + " " + userData.role + userData.speciality);

            console.log(isAuth)

            navigateToProfile();

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
        console.log(isAuth.loggedIn);
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