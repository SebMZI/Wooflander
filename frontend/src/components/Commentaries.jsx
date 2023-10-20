import { selectCurrentId } from "@/features/auth/authSlice";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from "@/features/commentary/commentaryApiSlice";
import {
  selectCurrentCommentaries,
  setCommentaries,
} from "@/features/commentary/commentarySlice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Commentaries = () => {
  const [addcomment] = useAddCommentMutation();
  const fromId = useSelector(selectCurrentId);
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { data: getComments } = useGetCommentsQuery(id);

  useEffect(() => {
    dispatch(setCommentaries(getComments));
  }, [getComments]);

  const handleComment = async () => {
    try {
      const result = await addcomment({ from: fromId, to: id, content });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const comments = useSelector(selectCurrentCommentaries);
  console.log(comments);

  return (
    <article className="commentaries">
      <div className="commentaries-container">
        {comments?.map((comment, index) => (
          <div className="commentary" key={index}>
            <h3 className="comment-title">{comment.username}</h3>
            <p className="comment-content">{comment.content}</p>
          </div>
        ))}
        {comments?.length === 0 ? (
          <p className="no-comments">No Comments</p>
        ) : null}
      </div>

      <div className="addCommentary">
        <textarea
          name="addcomment"
          className="inp-comment"
          id="addcomment"
          cols="30"
          rows="10"
          placeholder="Add a commentary..."
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="btn btn-solid" onClick={() => handleComment()}>
          Add
        </button>
      </div>
    </article>
  );
};

export default Commentaries;
