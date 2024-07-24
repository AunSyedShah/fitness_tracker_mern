import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useEffect } from "react";

export default function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const status = localStorage.getItem("isLoggedIn");
        if (status == 'true') {
            console.log(status);
            setIsLoggedIn(true);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}