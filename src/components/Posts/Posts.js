import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import Spinner from "../UI/Spinner/Spinner";
import Post from "./Post/Post";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      // .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  let postsRender = <Spinner />;
  if (posts) {
    postsRender = posts.map(({ post, id }) => (
      <Post
        key={id}
        username={post.username}
        caption={post.caption}
        imageUrl={post.imageUrl}
      />
    ));
  }
  return (
    <div className="container">
      <div className="posts">{postsRender}</div>
    </div>
  );
};

export default Posts;
