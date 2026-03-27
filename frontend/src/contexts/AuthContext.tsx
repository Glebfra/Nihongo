import { createContext, type ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<any>(null);

const AuthContextProvider = (props: AuthContextProviderProps): ReactNode => {
    const [ isAuth, setIsAuth ] = useState<boolean>(false);
    const [ isAccessValid, setIsAccessValid ] = useState<boolean>(true);

    const reload = 120;

    const setTokenToRequest = (token: string) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const checkToken = () => {
        const access = Cookies.get("access");
        console.log(access);
        if (access === undefined || access === null) {
            setIsAuth(false);
            setIsAccessValid(false);
            return;
        }

        axios.post("/auth/token/verify/", {
            "access": access
        }).then(() => setIsAccessValid(true)).catch(() => {
            setIsAuth(false);
            setIsAccessValid(false);
            Cookies.remove("access");
        });
    };

    const refreshToken = () => {
        const refresh = Cookies.get("refresh");
        if (refresh === undefined || refresh === null) {
            setIsAuth(false);
            return;
        }

        axios.post("/auth/token/refresh/", {
            "refresh": refresh
        }).then(response => {
            const token = response.data.access;
            Cookies.set("access", token);
            setTokenToRequest(token);
        }).catch(() => {
            setIsAuth(false);
            Cookies.remove("refresh");
        });
    };

    useEffect(() => {
        setInterval(checkToken, reload * 1000);
    }, []);

    useEffect(() => {
        if (isAccessValid)
            return;
        refreshToken();
    }, [ isAccessValid ]);

    return (
        <AuthContext.Provider value={[ isAuth, setIsAuth ]}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;