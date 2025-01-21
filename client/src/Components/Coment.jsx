import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0px;
`;

const Avtar = styled.img`
height: 36px;
width: 36px;
border-radius: 50%;
border: 1px solid black;
`

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    color:${({ theme }) => theme.text};
    margin-top: 5px;
`;

const Date = styled.span`
    font-size: 13px;
    padding-left: 3px;
    font-weight: 400;
`;

const Name = styled.span`
    font-size: 15px;
    font-weight: 500;
`
const Text = styled.text``


function Coment({ comment }) {

    const [channel, setChannel] = useState({});

    useEffect(() => {

        const fetchComment = async () => {
            const res = await axios.get(`/users/find/${comment.userId}`);
            setChannel(res.data)
        }
        fetchComment();
    }, [comment.userId])

    return (
        <Container>
            <Avtar src={channel.img}></Avtar>
            <Details>
                <Name>{channel.name} <Date>1 day ago</Date></Name>
                <Text>{comment.desc}</Text>
            </Details>
        </Container >
    )
}

export default Coment