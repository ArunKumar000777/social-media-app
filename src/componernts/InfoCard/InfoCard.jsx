import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import Edit from "@mui/icons-material/EditOutlined";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import ProfileModal from "../profileModal/ProfileModal";
import { useGetUserProfileInfoQuery } from "../../features/users/usersApiSlice";

const InfoCard = () => {
    const params = useParams();
    const { userId } = params;
    const { data } = useGetUserProfileInfoQuery({ userId });
    // console.log(data);
    const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) navigate("/login");
    }, [isSuccess, navigate]);

    const [edit, setEdit] = useState(false);

    let content;

    if (edit) {
        content = <ProfileModal setEdit={setEdit} edit={edit} />;
    } else {
        content = (
            <div className="infoCard">
                <div className="infoHeading">
                    <h4>Profile Info</h4>
                    <div className="edit">
                        <Edit onClick={() => setEdit(!edit)} />
                    </div>
                </div>
                <div className="info">
                    <span>
                        <b>Status</b>
                    </span>
                    <span> {data?.relationship}</span>
                </div>
                <div className="info">
                    <span>
                        <b>Lives in</b>
                    </span>
                    <span> {data?.livesin}</span>
                </div>
                <div className="info">
                    <span>
                        <b>Works at </b>
                    </span>
                    <span>{data?.worksAt}</span>
                </div>

                <button className="button L-button" onClick={sendLogout}>
                    Logout
                </button>
            </div>
        );
    }
    return content;
};

export default InfoCard;
