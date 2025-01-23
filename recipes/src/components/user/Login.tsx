import { FormEvent, useContext, useRef, useState } from "react"
import { UserContext } from "../../userReducer";
import OpenModal from "./OpenModal";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const Login = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { dispatch: userDispatch } = useContext(UserContext)
    const [isLogin, setLogin] = useState(false)
    const [isSignUp, setSignUp] = useState(false)
    const navigate = useNavigate()
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleOpenSignupbutton = () => {
        setIsModalOpen(true);
        setSignUp(true)
    };
    const handleOpenLoginbutton = () => {
        setIsModalOpen(true);
        setLogin(true)
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = isLogin ? 'http://localhost:3000/api/user/login' : 'http://localhost:3000/api/user/register';
        try {
            console.log(url);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'access-control-allow-origin': '*',
                },
                body: JSON.stringify({
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value
                }),
            });
            if (response.status === 401) {
                alert('משתמש לא מוכר נסה להרשם')
                setIsModalOpen(false)
            }
            else if (!response.ok) {
                throw new Error(`fetch error ${response.status}`)
            }
            else {
                if (isSignUp) {
                    const { userId } = await response.json();
                    userDispatch({
                        type: "signUp", data: {
                            id: userId,
                            email: emailRef.current?.value || '',
                            password: passwordRef.current?.value || ''
                        }
                    })

                    alert('התחברת בהצלחה למערכת')
                    navigate('/')
                }
                else if (isLogin) {
                    const { user } = await response.json();
                    userDispatch({
                        type: "login", data: user
                    })
                    navigate('/')
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            emailRef.current!.value = '';
            passwordRef.current!.value = '';
            isLogin && setLogin(false);
            isSignUp && setSignUp(false);
        }
    };
    return (<>
        <Button sx={{ margin: 1 }}
            variant="contained"
            color="success"
            onClick={handleOpenLoginbutton}><LoginIcon sx={{marginRight:2}}/>  Login </Button>
        <Button sx={{ margin: 1 }}
            variant="contained"
            color="success"
            onClick={handleOpenSignupbutton}><PersonAddIcon sx={{marginRight:2}}/>  SignUp</Button>
        <OpenModal open={isModalOpen} onClose={handleClose} onSubmit={handleLogin} emailRef={emailRef} passwordRef={passwordRef} />
    </>)
}
export default Login
