import React, { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'


export const UserContext = createContext();



const UserProvider = props => {
    const [ token, setToken ] = useState(localStorage.getItem('access-token'));
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('http://127.0.0.1:8000/user/login/me', {
                method: 'GET',
                headers: {
                    accept: 'application/json ',
                    Authorization: `Bearer ${token}`
                }
            })
            if (!response.ok) {
                localStorage.setItem('access-token', null)
            } else {
                localStorage.setItem('access-token', token)
            }
        }
        fetchUser();
    }, [ token ])
    return (
        <UserContext.Provider value={ [ token, setToken ] }>
            { props.children }
        </UserContext.Provider>
    )

}


export default UserProvider;