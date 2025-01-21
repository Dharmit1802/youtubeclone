import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../Components/Card';
import axios from "axios";

const Container = styled.div`
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    gap: 10px;
`;

function Home({ type }) {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null); // State to capture error messages

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // Check if type is valid
                if (!type) {
                    console.error("Type is not provided.");
                    return;
                }

                const res = await axios.get(`/videos/${type}`);
                setVideos(res.data); // Update videos only if response is valid

                // Log success and response for debugging
                console.log("Fetched videos:", res.data);
            } catch (error) {
                // Catch and log error
                console.error("Error fetching data:", error.message);
                setError(error.message); // Store error message in state
            }
        };

        fetchVideos();
    }, [type]);

    // Show error message if there was an issue with fetching
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container>
            {
                videos.map((video) => {
                    return <Card key={video._id} video={video} />;
                })
            }
        </Container>
    );
}

export default Home;
