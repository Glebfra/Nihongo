import { type ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.tsx";
import { Navigate } from "react-router-dom";

const Account = (): ReactNode => {
    const [ isAuth ] = useContext(AuthContext);

    if (!isAuth) {
        return <Navigate to={"/auth"}/>;
    }

    return (
        <div>
            Account
        </div>
    );
};

export default Account;