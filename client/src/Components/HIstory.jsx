import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import axios from 'axios';


const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Wrapper = styled.div`
    display: flex;
    flex-wrap:wrap;
    gap: 10px;
    justify-content: start;
    align-items: center;
`

const Title = styled.h1`
    font-size: 24px;
    color: ${({ theme }) => theme.text};
`;

const Text = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: ${({ theme }) => theme.text};

`

const History = () => {

    const [history, setHistory] = useState([])

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await axios.get("/users/history");
            if (res) {
                setHistory(res.data)
            }
        }
        fetchHistory();
    }, [])

    return (
        <Container>
            <Title>Watch History</Title>
            <Wrapper>

                {history && history.length > 0 ? (
                    history.reverse().map((video) => (
                        <Card key={video._id} video={video} />
                    ))
                ) : (
                    <Text>No videos watched yet.</Text>
                )}
            </Wrapper>
        </Container>
    );
};

export default History;
