import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Coment from './Coment';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Container = styled.div`
   margin-top: 25px;
`;

const NewComment = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const Avtar = styled.img`
    height: 36px;
    width: 36px;
    border-radius: 50%;
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.soft};
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    outline: none;
    padding: 5px;
    width: 100%;
`;

function Coments({ videoId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`/comments/${videoId}`);
                setComments(res.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, [videoId]);

    const submitHandler = async (e) => {
        if (e.key === 'Enter' && newComment.trim()) {
            try {
                const res = await axios.post('/comments/', {
                    videoId,
                    desc: newComment,
                });
                setComments((prev) => [res.data, ...prev]);
                setNewComment('');
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    return (
        <Container>
            <NewComment>
                <Avtar src={currentUser.img} alt="avatar" />
                <Input
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={submitHandler}
                />
            </NewComment>
            {comments.map((comment) => (
                <Coment key={comment._id} comment={comment} />
            ))}
        </Container>
    );
}

export default Coments;
