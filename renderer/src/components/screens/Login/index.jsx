
import { FaRegUserCircle } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import {
    ContentForm,
    LoginButton,
    LoginForm,
    ContainerLogin,
} from "./style";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Authenticate } from "../../../services/authenticate/authenticate";
import { BasicInput } from "../../Input";
import swal from "sweetalert";
import { decryptData, encryptData } from "../../../services/authenticate/CriptoJs";
import Cookies from "js-cookie";
import { ContainerJSX } from "../../Container";
import { CloseButton } from "./style";
import { CloseIconButton } from "./style";
const logo = require('../../../assets/imagens/logo.png')

export const FormLogin = () => {
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    const navigate = useNavigate();
    const [formLogin, setFormLogin] = useState({ email: "", password: "" });
    const [rememberMe, setRememberMe] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };


    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormLogin((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const closeMainWindow = () => { 
        window.api.CloseMainWindow()
    }
    useEffect(() => {
        const savedEmail = Cookies.get("email");
        const savedPassword = Cookies.get("pass");

        if (savedEmail && savedPassword) {
            setFormLogin({
                email: decryptData(savedEmail),
                password: decryptData(savedPassword),
            });
            setRememberMe(true);
        }
    }, []);

    const handleCheckboxChange = (event) => {
        setRememberMe(event.target.checked);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (rememberMe) {
            const Email = window.document.getElementById("email-login").value
            const Pass = window.document.getElementById("pass-login").value
            Cookies.set('email', encryptData(Email))
            Cookies.set('pass', encryptData(Pass))
        } else {
            Cookies.remove("email")
            Cookies.remove("pass")
        }
 
        try {
            if (!validateEmail(formLogin.email)) {
                setError(true);
                setHelperText('Por favor, insira um e-mail válido.');
            } else {
                setError(false);
                setHelperText('');
            }
            const response = await Authenticate(formLogin);
            console.log('RESPONSE: ', response)
            if (response.ok === true) {
                window.api.NavigateTo('home')
                console.log('Navegando para HOME')
            } else {
                navigate('/login');
                swal({
                    title: "Error!",
                    text: response.error? response.error :"Erro desconhecido.",
                    icon: "error",
                    timer: 2000,
                    button: false
                });
            }
        } catch (err) {
            swal({
                title: "Error!",
                text: err? err : 'Erro desconhecido!',
                icon: "error",
                timer: 2000,
                button: false
            });
        } 
    };



    useEffect(() => {
        const hasReloaded = localStorage.getItem('hasReloaded');

        if (!hasReloaded) {
            // Se não foi recarregada, recarrega e define no localStorage
            localStorage.setItem('hasReloaded', 'true');
            window.location.reload();
        }

    }, []);

    return (
        <>
            <ContainerJSX/>
            <CloseButton onClick={()=> closeMainWindow()}>
                <CloseIconButton></CloseIconButton>
            </CloseButton>
            <ContainerLogin>
                <LoginForm onSubmit={(event) => handleSubmit(event)}>
                    <ContentForm>
                        <img src={logo} alt="logo" style={{ width: "25%", height: "75%", margin: "0 auto" }} />
                    </ContentForm>

                    <div>
                        <ContentForm>
                            <BasicInput
                                id={"email-login"}
                                error={error}
                                helptext={helperText}
                                type="email"
                                label="Email"
                                placeholder={"Digite seu Email"}
                                value={formLogin.email}
                                name="email"
                                onChange={handleOnChange}
                                require={true}
                                icon={<FaRegUserCircle />}
                            />
                        </ContentForm>
                        <ContentForm>
                            <BasicInput
                                id={"pass-login"}
                                type="password"
                                label={"Senha"}
                                placeholder={"Digite sua senha"}
                                name="password"
                                value={formLogin.password}
                                onChange={handleOnChange}
                                require={true}
                                icon={<MdPassword />}
                            />
                        </ContentForm>
                        <ContentForm id="rememberme">
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={handleCheckboxChange}
                                    />
                                    Lembrar-me
                                </label>
                            </div>
                        </ContentForm>
                        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem", width: "100%" }}>
                            <LoginButton type="submit"> Entrar </LoginButton>
                        </div>

                    </div>


                </LoginForm>
            </ContainerLogin>
        </>
    );
};