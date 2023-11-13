import { selectCurrentId } from "@/features/auth/authSlice";
import {
  useAddCommentMutation,
  useAddNotesMutation,
  useGetCommentsQuery,
} from "@/features/commentary/commentaryApiSlice";
import {
  selectCurrentCommentaries,
  setCommentaries,
} from "@/features/commentary/commentarySlice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { format } from "date-fns";

const Commentaries = ({ sitter }) => {
  const [addcomment] = useAddCommentMutation();
  const [addNote] = useAddNotesMutation();
  const fromId = useSelector(selectCurrentId);
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState("");
  const userId = useSelector(selectCurrentId);
  const dispatch = useDispatch();
  const profileId = id ? id : userId;
  const { data: getComments } = useGetCommentsQuery(profileId);
  const [rating, setRating] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    dispatch(setCommentaries(getComments));
  }, [getComments, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setMsg("");
    }, 3000);
  }, [msg]);

  const handleComment = async () => {
    if (!content || !rating) {
      return setMsg("Add a comment and a rating");
    }

    try {
      const result = await addcomment({
        from: fromId,
        to: id,
        content,
        ratingNote: rating,
      });
      console.log(result);
      const text = document.querySelector(".inp-comment");
      text.value = "";
      setRating(0);
      setMsg("Comment added successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const comments = useSelector(selectCurrentCommentaries);
  console.table(comments);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <article className="commentaries">
      <div className="commentaries-container">
        {comments?.map((comment, index) => (
          <div className="commentary" key={index}>
            <div className="commentary-header">
              <h3 className="comment-title">{comment.username}</h3>
              {comment.ratings_details === null ? null : (
                <StarRatings
                  rating={comment.ratings_details?.rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="18px"
                  starSpacing="0px"
                />
              )}
            </div>

            <p className="comment-content">{comment.content}</p>
            <p className="comment-date">
              {format(new Date(comment?.createdAt), "dd MMM yyyy")}
            </p>
          </div>
        ))}
        {comments?.length === 0 ? (
          <p className="no-comments">No Comments for now...</p>
        ) : null}
      </div>

      {!sitter ? (
        <div className="addCommentary">
          <textarea
            name="addcomment"
            className="inp-comment"
            id="addcomment"
            cols="30"
            rows="10"
            maxLength={400}
            placeholder="Add a commentary..."
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="add-btn">
            <StarRatings
              rating={rating}
              starRatedColor="gold"
              starHoverColor="gold"
              starDimension="25px"
              starSpacing="1px"
              changeRating={handleRatingChange}
              numberOfStars={5}
              name="rating"
              className="rating"
            />
            <p className="msg">{msg ? msg : null}</p>
            <button className="btn btn-solid" onClick={() => handleComment()}>
              Add
            </button>
          </div>
        </div>
      ) : null}
    </article>
  );
};

export default Commentaries;
