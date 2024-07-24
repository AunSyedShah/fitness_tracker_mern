import {useState, useEffect} from "react";
import {AuthContext} from "./AuthContext";

export default function AuthProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const status = localStorage.getItem("isLoggedIn");
        if (status === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}
