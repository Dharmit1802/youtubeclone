import React, { useState } from "react";
import styled from "styled-components";

import axios from "axios";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;
const Upload = ({ setOpen }) => {
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);

    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleTags = (e) => {
        setTags(e.target.value.split(","));
    };

    const handleUpload = async () => {
        if (!video || !img) {
            alert('Please select both video and image files to upload.');
            return;
        }

        setUploading(true);

        try {
            // Upload video to Cloudinary
            const formDataVideo = new FormData();
            formDataVideo.append('file', video);
            formDataVideo.append('upload_preset', 'ml_default');
            formDataVideo.append('cloud_name', 'dzmwt3pxz');

            const responseVideo = await axios.post(
                `https://api.cloudinary.com/v1_1/dzmwt3pxz/video/upload`,
                formDataVideo
            );
            const videoUrlcloud = responseVideo.data.secure_url;

            // Upload image to Cloudinary
            const formDataImage = new FormData();
            formDataImage.append('file', img);
            formDataImage.append('upload_preset', 'ml_default');
            formDataImage.append('cloud_name', 'dzmwt3pxz');

            const responseImage = await axios.post(
                `https://api.cloudinary.com/v1_1/dzmwt3pxz/image/upload`,
                formDataImage
            );
            const imageUrlcloud = responseImage.data.secure_url;

            // Prepare data to send to the backend
            const dataToSend = {
                ...inputs,
                videoUrl: videoUrlcloud,
                imgUrl: imageUrlcloud,
                tags
            };

            const res = await axios.post("/videos", dataToSend);

            setOpen(false);
            navigate(`/video/${res.data.message._id}`)
            console.log(res.data);

        } catch (error) {
            if (error.response) {
                console.error('Server error:', error.response.data);
                alert(`Server error: ${error.response.data.message || 'Failed to upload video.'}`);
            } else if (error.request) {
                console.error('No response from server:', error.request);
                alert('No response from server. Please try again later.');
            } else {
                console.error('Error:', error.message);
                alert(`Error: ${error.message}`);
            }
        } finally {
            setUploading(false);
        }
    };



    // const handleUpload = async (e) => {
    //     e.preventDefault();
    //     const res = await axios.post("/videos", { ...inputs, tags })
    //     setOpen(false)
    //     res.status === 200 && navigate(`/video/${res.data._id}`)
    // }

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload a New Video</Title>
                <Label>Video:</Label>

                <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files[0])}
                />

                <Input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                />
                <Desc
                    placeholder="Description"
                    name="desc"
                    rows={8}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Separate the tags with commas."
                    onChange={handleTags}
                />
                <Label>Image:</Label>

                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                />

                <Button onClick={handleUpload} disabled={uploading}> {uploading ? 'Uploading...' : 'Upload Video'}</Button>
            </Wrapper>
        </Container>
    );
};

export default Upload;