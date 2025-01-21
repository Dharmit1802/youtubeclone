import React, { useState } from 'react'
import styled from 'styled-components'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Upload from './Upload.jsx';
import { useDispatch } from 'react-redux';
import { logout } from '../Slices/UserSlice.js';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Container = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.bgLighter};
    height: 56px;
    color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    padding: 0px 20px;
    position: relative;
`;

const Search = styled.div`
    position: absolute;
    width: 40%;
    left: 0px;
    right: 0px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
`;

const Input = styled.input`
    border: none;
    background: transparent;
    outline: none;
    color: ${({ theme }) => theme.text};;
`;

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff ;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
   
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px ;
    `;

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};;
`

const Avtar = styled.img`
    height: 36px;
    width: 36px;
    border-radius: 50%;
    background-color: #999;
`

const PopupButton = styled.button`
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.text};
    padding: 5px 0;
    cursor: pointer;
    width: 100%;
    text-align: left;

    &:hover {
        background-color: ${({ theme }) => theme.bgSoft};
    }
`;

const Popup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    position: absolute;
    align-items: center;
    top: 60px;
    right: 20px;
    background-color: ${({ theme }) => theme.bgLighter};
    padding: 10px 15px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    align-items: flex-start;
    width: 120px;
`;

function Navbar() {

    const { currentUser } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [q, setQ] = useState("");

    const handleLogout = () => {
        dispatch(logout());
        setShowPopup(false)
        navigate('/signin');
    };

    return (
        <>
            <Container>
                <Wrapper>
                    <Search>
                        <Input placeholder="Search" onChange={(e) => setQ(e.target.value)} />
                        <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
                    </Search>

                    {
                        currentUser ?
                            <User onClick={() => setShowPopup(!showPopup)}>
                                <VideoCallOutlinedIcon onClick={(e) => setOpen(true)} />
                                <Avtar src={currentUser.img} />
                                {currentUser.name}

                            </User> :
                            <Link to="signin" style={{ textDecoration: "none" }}>
                                <Button>
                                    <AccountCircleOutlinedIcon />
                                    SIGN IN
                                </Button>
                            </Link>
                    }

                </Wrapper>
                {showPopup && (
                    <Popup>
                        <LogoutIcon />
                        <PopupButton onClick={handleLogout}>Logout</PopupButton>
                    </Popup>
                )}
            </Container>
            {
                open && <Upload setOpen={setOpen} />
            }
        </>
    )
}

export default Navbar