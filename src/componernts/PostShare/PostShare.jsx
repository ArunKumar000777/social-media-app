import React, { useState } from "react";
import "./PostShare.css";
import ImageIcon from "@mui/icons-material/Image";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useRef } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import useAuth from "../../hooks/useAuth";
import { useUploadImageMutation } from "../../features/posts/postsApiSlice";
import { usePostDataMutation } from "../../features/posts/postsApiSlice";
const PostShare = () => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const desc = useRef();
    const { userId, user } = useAuth();

    const [uploadImage, { isLoading, isSuccess, isError, error }] = useUploadImageMutation();
    const [postData, { isLoading: loading, isSuccess: success, isError: eerror, error: errorr }] = usePostDataMutation();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    };

    const resetForm = () => {
        setImage("");
        desc.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            userId,
            desc: desc.current.value,
        };
        if (image) {
            const data = new FormData();
            const filename = Date.now() + image.name;
            data.append("name", filename);
            data.append("file", image);
            newPost.image = filename;
            try {
                const res = await uploadImage(data);
            } catch (error) {
            }
        }
        const res = await postData(newPost);
        resetForm();
    };
    return (
        <div className="PostShare">
            <img
                className="profileImg"
                src={user?.profilePicture ? serverPublic + user?.profilePicture : serverPublic + "defaultProfile.png"}
                alt="profileimg"
            />
            <div>
                <input type="text" placeholder="What's happening" required ref={desc} />
                <div className="postOptions">
                    <div className="option" style={{ color: "var(--photo)" }} onClick={() => imageRef.current.click()}>
                        <ImageIcon />
                        Photo
                    </div>
                    <div className="option" style={{ color: "var(--video)" }}>
                        <PlayCircleOutlineIcon />
                        Video
                    </div>
                    <div className="option" style={{ color: "var(--location)" }}>
                        <LocationOnIcon />
                        Location
                    </div>
                    <div className="option" style={{ color: "var(--shedule)" }}>
                        <EventNoteIcon />
                        Schedule
                    </div>
                    <button className="button ps-button" onClick={handleSubmit}>
                        Share
                    </button>
                    <div style={{ display: "none" }}>
                        <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>
                {image && (
                    <div className="previewImage">
                        <CloseOutlinedIcon onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostShare;
