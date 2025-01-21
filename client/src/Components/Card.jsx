import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from "moment"
import axios from "axios"
const Container = styled.div`
    width: ${(prop) => prop.type !== "sm" && "400px"};;
    margin-bottom: ${(prop) => prop.type === "sm" ? "10px" : "45px"};
    cursor: pointer;
    display: ${(prop) => prop.type === "sm" && "flex"};
`;
const Image = styled.img`
    width: 100%;
    height: ${(prop) => prop.type === "sm" ? "100px" : "220px"};
    background-color: #999;
    flex: 1.2;
`;

const Details = styled.div`
    display: flex;
    margin-top: ${(prop) => prop.type === "sm" ? "3px" : "16px"};
    margin-left: ${(prop) => prop.type === "sm" ? "12px" : "none"};;
    gap: 12px;
    flex: 1;

`;

const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: ${(prop) => prop.type === "sm" ? "none" : "block"};;
    /* background-color: #999; */
`;

const Texts = styled.div`
    
`;

const Title = styled.h1`
    font-size: ${(prop) => prop.type === "sm" ? "15px" : "16px"};;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    margin: 0px ;
`;

const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
    margin: 8px 0px;
`;

const Info = styled.div`
 font-size: 12px;
    color: ${({ theme }) => theme.textSoft};`

function Card({ type, video }) {

    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axios.get(`/users/find/${video.userId}`)
            setChannel(res.data);
        }
        fetchChannel();
    }, [video.userId])

    return (
        <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
            <Container type={type}>
                <Image type={type} src={video.imgUrl} />
                <Details type={type}>
                    <ChannelImage type={type} src={channel.image ? channel.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_p9E4w_1XvG8mmqeII8KdLBool6_9xxHqcQ&s'} />
                    <Texts type={type}>
                        <Title type={type}>{video.title}</Title>
                        <ChannelName type={type}>{channel.name}</ChannelName>
                        <Info type={type}>{video.views} views · {moment(video.createdAt).fromNow()}</Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    )
}

export default Card