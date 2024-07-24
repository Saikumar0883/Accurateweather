import React, { createContext, useEffect, useState } from 'react';
import { API_URL } from '../config';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/profile`, {
            credentials: 'include',
        })
        .then((res) => {
            if (res.ok) {
                // Only process the response if the status code is 200 (or other success codes)
                res.json().then(userInfo => {
                    setUserInfo(userInfo);
                    setIsLoading(false);
                });
            } else {
                // Handle cases where the response is not OK
                console.log("Fetch error:", res.statusText);
                setIsLoading(false);
            }
        })
        .catch(error => {
            // Handle fetch errors
            console.log("Fetch error:", error);
            setIsLoading(false);
        });
    }, []);

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, isLoading, setIsLoading }}>
            {children}
        </UserContext.Provider>
    );
}
