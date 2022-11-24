import React, { useState } from "react";
import "./profileModal.css";
import CloseIcon from "@mui/icons-material/Close";
import useAuth from "../../hooks/useAuth";
import { useUploadPictureMutation } from "../../features/users/usersApiSlice";
import { useUpdateUserMutation } from "../../features/users/usersApiSlice";
import { useParams } from "react-router-dom";
const ProfileModal = ({ setEdit, edit }) => {
    let { user } = useAuth();
    const { userId } = useParams();
    // console.log(userId === user._id);
    const { password, ...userWithoutPassword } = user;
    const [formData, setformData] = useState(userWithoutPassword);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState("");
    const [uploadPicture, { isLoading, isSuccess, isError, error }] = useUploadPictureMutation();
    const [updateUser, { isSuccess: isUpdateSuccess, isError: isUpdateError, error: updataError }] =
        useUpdateUserMutation();
    // console.log(formData);

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0]);
            let img = e.target.files[0];
            e.target.name === "profilePicture" ? setProfileImage(img) : setCoverImage(img);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userData = formData;
        if (profileImage) {
            const data = new FormData();
            const fileName = Date.now() + profileImage.name;
            data.append("name", fileName);
            data.append("file", profileImage);
            userData.profilePicture = fileName;
            try {
                const res = await uploadPicture(data);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        // console.log(userData);
        if (coverImage) {
            const data = new FormData();
            const fileName = Date.now() + coverImage.name;
            data.append("name", fileName);
            data.append("file", coverImage);
            userData.coverPicture = fileName;
            try {
                const res = await uploadPicture(data);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        const res = await updateUser({ userId, userData });
        setEdit(!edit);
        // console.log(res);
    };
    return (
        <div className="modal">
            <h3>Your Info</h3>
            <form>
                <CloseIcon onClick={() => setEdit(!edit)} className="close" fontSize="small" />

                <div className="modal_nameInputs">
                    <input
                        type="text"
                        onChange={handleChange}
                        placeholder="First Name"
                        name="firstname"
                        value={formData?.firstname}
                    />
                    <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Last Name"
                        name="lastname"
                        value={formData?.lastname}
                    />
                </div>

                <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Works at"
                    name="worksAt"
                    value={formData?.worksAt}
                />
                <div className="modal_aboutInputs">
                    <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Lives in"
                        name="livesin"
                        value={formData?.livesin}
                    />
                    <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Country"
                        name="country"
                        value={formData?.country}
                    />
                </div>

                <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Relationship Status"
                    name="relationship"
                    value={formData?.relationship}
                />

                <div className="modal_FileUpload">
                    <div>
                        <label htmlFor="profilePicture">Profile Image</label>
                        <input type="file" id="profilePicture" name="profilePicture" onChange={onImageChange} />
                    </div>
                    <div>
                        <label htmlFor="coverPicture">Cover Image</label>
                        <input type="file" id="coverPicture" name="coverPicture" onChange={onImageChange} />
                    </div>
                </div>
                <button className="modal__updateBtn button" onClick={handleSubmit}>
                    Update
                </button>
            </form>
        </div>
    );
};

export default ProfileModal;
