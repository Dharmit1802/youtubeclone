import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Coments from '../Components/Coments';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { fetchSuccess, like, dislike } from '../Slices/VideoSlice';
import { subscribe } from "../Slices/UserSlice"
import moment from 'moment';
import Recommendation from "../Components/Recommendation"


const Container = styled.div`
    display: flex;
    gap: 24px;
`;

const Content = styled.div`
    flex: 5;
`;

const VideoWrapper = styled.div`
    
`;

const Title = styled.h1`
    font-size: 18px;
    font-weight: 400;
    margin-top: 10px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Info = styled.span`
    color: ${({ theme }) => theme.textSoft};
    font-size: 16px;
`

const Buttons = styled.div`
    display: flex;
    gap: 15px;
    margin-top: -45px;
    color: ${({ theme }) => theme.text};

`

const Button = styled.div`
    display: flex;
    align-items: center ;
    gap: 5px;
    font-size: 16px;
    cursor: pointer;
`



const Hr = styled.hr`
    margin: 13px 0px;
    border: 0.5px solid #6b6464;
`;

const Channel = styled.div`
    margin-top: 17px;
    display: flex;
    justify-content: space-between;
`;

const ChannelInfo = styled.div`
    display: flex;
    gap: 10px;
    color: ${({ theme }) => theme.text};
`;

const Image = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
`;

const ChannelDetail = styled.div``;

const ChannelName = styled.div`
    font-weight: 700;
    color: ${({ theme }) => theme.text};
    font-size: 20px;

`;

const ChannelCounter = styled.div`
    font-size: 16px;
    margin-top: 6px;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.textSoft};

`;

const Description = styled.div`
    font-size: 16px;
`;

const Subscribe = styled.button`
    background-color: #cc1a00;
    border: none;
    border-radius: 5px;
    height: max-content;
    padding: 10px 30px;
    color: white;
    cursor: pointer;
`

const VideoFrame = styled.video`
    max-height: 720px;
    width: 100%;
    object-fit: cover;
`

function Video() {

    const { currentUser } = useSelector((state) => state.user);
    const { currentVideo } = useSelector((state) => state.video);
    const dispatch = useDispatch();
    const [channel, setChannel] = useState({});



    const path = useLocation().pathname.split("/").at(-1);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const videoRes = await axios.get(`/videos/find/${path}`);
                await axios.put(`/videos/history/${path}`);
                const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data));

            } catch (error) {

            }
        };
        fetchData();
    }, [path, dispatch])


    useEffect(() => {
        const view = async () => {
            try {
                axios.put(`/videos/view/${path}`)
            } catch (error) {

            }
        }
        view();
    }, [path])

    const handlelike = async () => {
        await axios.put(`/users/like/${currentVideo._id}`)
        dispatch(like(currentUser._id))
    }
    const handledislike = async () => {
        await axios.put(`/users/dislike/${currentVideo._id}`)
        dispatch(dislike(currentUser._id))

    }
    const handlesub = async () => {
        if (currentUser.subscribedUser.includes(channel._id)) {
            await axios.put(`/users/unsub/${channel._id}`);
            channel.subscribers -= 1;
        } else {
            await axios.put(`/users/sub/${channel._id}`);
            channel.subscribers += 1;

        }
        dispatch(subscribe(channel._id))
    }


    return (
        <Container>
            <Content>
                <VideoFrame src={currentVideo?.videoUrl} controls autoPlay loop></VideoFrame>
                <VideoWrapper />
                <Title>{currentVideo.title}</Title>
                <Details>
                    <Info>{currentVideo.views} views · {moment(currentVideo.createdAt).fromNow()}</Info>
                    <Buttons>
                        <Button onClick={handlelike}>
                            {
                                currentVideo.likes?.includes(currentUser?._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />
                            }
                            {currentVideo.likes.length}
                        </Button>
                        <Button onClick={handledislike}>
                            {
                                currentVideo.dislikes?.includes(currentUser._id) ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />
                            }
                            {currentVideo.dislikes.length}
                        </Button>
                        <Button>
                            <ReplyOutlinedIcon /> share
                        </Button>
                        <Button>
                            <BookmarkBorderOutlinedIcon /> save
                        </Button>
                    </Buttons>
                </Details>
                <Hr></Hr>
                <Channel>
                    <ChannelInfo>
                        <Image src={channel.img} />
                        <ChannelDetail>
                            <ChannelName>{channel.name}</ChannelName>
                            <ChannelCounter>{channel.subscribers} subscriber</ChannelCounter>
                            <Description>{currentVideo.desc}</Description>
                        </ChannelDetail>
                    </ChannelInfo>
                    <Subscribe onClick={handlesub}>
                        {
                            currentUser.subscribedUser.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"
                        }
                    </Subscribe>
                </Channel>
                <Hr />
                <Coments videoId={currentVideo._id} />
            </Content>
            <Recommendation tags={currentVideo.tags} />
        </Container>
    )
}

export default Video