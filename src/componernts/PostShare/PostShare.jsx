import React, { useState } from "react";
import profileimg from "../../img/profileImg.jpg";
import "./PostShare.css";
import ImageIcon from "@mui/icons-material/Image";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useRef } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const PostShare = () => {
    const [image, setImage] = useState(null);
    const imageRef = useRef();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage({
                image: URL.createObjectURL(img),
            });
        }
    };
    console.log(image);
    return (
        <div className="PostShare">
            <img className="profileImg" src={profileimg} alt="profileimg" />
            <div>
                <input type="text" placeholder="What's happening" />
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
                    <button className="button ps-button">Share</button>
                    <div style={{ display: "none" }}>
                        <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>
                {image && (
                    <div className="previewImage">
                        <CloseOutlinedIcon onClick={() => setImage("")} />
                        <img src={image.image} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostShare;
