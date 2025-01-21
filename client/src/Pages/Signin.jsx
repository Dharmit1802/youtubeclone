import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { loginError, loginStart, loginSuccess } from '../Slices/UserSlice';
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 117px);
    color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    gap: 10px;
    padding: 20px 50px;
    background-color: ${({ theme }) => theme.bgLighter};
    border: 1px solid ${({ theme }) => theme.soft};
    width: 400px;
`;

const Title = styled.div`
    font-size: 24px;
`

const SubTitle = styled.div`
    font-size: 20px;
    font-weight: 300;
`

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.soft};
    background-color: transparent;
    border-radius: 3px;
    width: 100%;
    padding: 10px;
    color: ${({ theme }) => theme.text};
`

const Button = styled.button`
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    color: ${({ theme }) => theme.textSoft};
    background-color: ${({ theme }) => theme.soft};
    border-radius: 3px;
    border: none;
`

const More = styled.div`
    display: flex;
    gap: 69px;
    margin-top: 5px;
    color: ${({ theme }) => theme.textSoft};
    font-size: 12px;
`

const Links = styled.div`
    display:flex;
    gap: 10px;
`

const Link = styled.div``



function Signin() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameLog, setNameLog] = useState("");
    const [passwordLog, setPasswordLog] = useState("")


    const [signupSuccess, setSignupSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post("/auth/signin", { name: nameLog, password: passwordLog });
            dispatch(loginSuccess(res.data));
            navigate("/");
        } catch (error) {
            dispatch(loginError());
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/signup", { name, email, password });
            console.log(res.data);
            setSignupSuccess(true);
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.log(error.message);
            setSignupSuccess(false);
        }
    };

    const signInWithGoogle = async () => {
        dispatch(loginStart());
        try {
            const result = await signInWithPopup(auth, provider);
            const res = await axios.post("auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL,
            });
            dispatch(loginSuccess(res.data));
            navigate("/");
        } catch (error) {
            dispatch(loginError(error));
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>Sign in</Title>
                <SubTitle>to continue to youtube</SubTitle>
                <Input placeholder='Username' value={nameLog} onChange={e => setNameLog(e.target.value)} />
                <Input type='password' placeholder='Password' value={passwordLog} onChange={e => setPasswordLog(e.target.value)} />
                <Button onClick={handleSignin}>Sign In</Button>
                <Title>OR</Title>
                <Button onClick={signInWithGoogle}>Sign In with Google</Button>
                <Title>OR</Title>
                <Input placeholder='Username' value={name} onChange={e => setName(e.target.value)} />
                <Input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                <Input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <Button onClick={handleSignup}>Sign Up</Button>
                {signupSuccess && <p>Sign up successful! Kindly log in to continue.</p>}
            </Wrapper>
            <More>
                English(USA)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    );
}

export default Signin;