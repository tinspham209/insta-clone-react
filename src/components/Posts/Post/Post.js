import React, { useState, useEffect } from "react";
import "./Post.css";
import { Input, Avatar, Button } from "@material-ui/core";

import { db } from "../../../firebase";

const Post = (props) => {
  const { postId, user, username, caption, imageUrl } = props;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
    });
    setComment("");
  };

  return (
    <div className="post">
      {/* {header -> avatar + username} */}
      {/* {images} */}
      {/* {username + cation} */}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="../../../static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      <img src={imageUrl} alt="" className="post__image" />

      <h4 className="post__text">
        {" "}
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      <form className="post__commentBox">
        <Input
          className="post__commentBox-input"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          className="post__commentBox-button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
          color="primary"
        >
          Post
        </Button>
      </form>
    </div>
  );
};

export default Post;
