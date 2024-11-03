import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./providers/AuthProvider";
import Layout from "./Layout";

const Router = ({ component: Component, isAdmin = false, ...rest }) => {
    const { session } = useContext(AuthContext);

    if (!isAdmin) {
        return <Layout {...rest} />;
    } else {
        console.log('Is logged in: ', session.isLoggedIn);
        return session.isLoggedIn ?
            <Layout {...rest} /> :
            <Navigate to="/login" replace state={{ from: rest.location }} />;
    }
}

export default Router;