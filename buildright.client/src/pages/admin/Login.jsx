import { useContext, useState } from "react";
import FloatingInput from "../../components/FloatingInput";
import FormContainer from "../../components/FormContainer";
import Page from "../../components/Page";
import { AuthContext } from "../../providers/AuthProvider";
import { useRef } from "react";

const Login = () => {
    const loginBtn = useRef();
    const { login, state } = useContext(AuthContext);
    const [error, setError] = useState();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const onEmailChanged = (e) => {
        let email = e.target.value;
        setCredentials(prev => ({ ...prev, email: email }));
    }

    const onPasswordChanged = (e) => {
        let password = e.target.value;
        setCredentials(prev => ({ ...prev, password: password }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        loginBtn.current.disabled = true;
        setError("");

        const { status, response } = await login(credentials);

        if (!status) {
            setError(response);
        }

        loginBtn.current.disabled = false;
    }

    return (
        <Page>
            <FormContainer title="Login" onSubmit={handleLogin }>
                <FloatingInput type="text" value={credentials.email} id="email" onChange={onEmailChanged} required={true} placeholder="Email" />
                <FloatingInput type="password" value={credentials.password} id="password" onChange={onPasswordChanged} required={true} placeholder="Password" />
                <button className="w-100 btn btn-primary" type="submit" ref={loginBtn }>Log In</button>
            </FormContainer>
        </Page>
    )
}

export default Login;