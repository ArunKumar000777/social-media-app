import React, { useEffect, useState } from "react";
import "./singlePost.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOnePostQuery, useDeletePostMutation, useUpdatePostMutation } from "../../features/posts/postsApiSlice";
import useAuth from "../../hooks/useAuth";
const SinglePost = () => {
    const { userId } = useAuth();
    const { postId } = useParams();

    const [desc, setDesc] = useState(null);
    const [updateMode, setUpdateMode] = useState(false);

    const navigate = useNavigate();

    //! singlePost get request
    let { data: singlePost, isLoading, isSuccess, isError, error, refetch } = useGetOnePostQuery(postId);
    const [deletePost, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] = useDeletePostMutation();
    const [updatePost, { isSuccess: isUpdateSuccess }] = useUpdatePostMutation();
    useEffect(() => {
        // const description = singlePost?.desc;
        setDesc(singlePost?.desc);
    }, [singlePost]);
    console.log(desc);
    console.log(isUpdateSuccess);

    const onDeletePostClicked = async () => {
        await deletePost({ postId, userId });
        navigate("/home");
    };
    const onUpdateButtonClicked = async () => {
      const res=  await updatePost({ postId, userId, desc });
      res?.data && navigate('/home')
    };

    return (
        <div className="container">
            <div className="post__image__wrapper">
                <img
                    className="post__image"
                    src={singlePost?.image ? process.env.REACT_APP_PUBLIC_FOLDER + singlePost?.image : ""}
                    alt="Postimage"
                />
            </div>
            <div className="post_infoo">
                {updateMode ? (
                    <>
                        <textarea value={desc} rows="5" onChange={(e) => setDesc(e.target.value)} />
                        <button onClick={onUpdateButtonClicked} className="button update__button">
                            update
                        </button>
                    </>
                ) : (
                    <h3 className="description">{desc}</h3>
                )}
                {userId === singlePost?.userId ? (
                    <div className="icon__wrapper">
                        <EditIcon className="edit__icon" onClick={() => setUpdateMode(!updateMode)} />
                        <DeleteIcon className="delete__icon" onClick={onDeletePostClicked} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default SinglePost;
