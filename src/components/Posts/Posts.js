import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import Spinner from "../UI/Spinner/Spinner";
import InstagramEmbed from "react-instagram-embed";
import Post from "./Post/Post";
import "./Posts.css";

const Posts = (props) => {
  const { user } = props;
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
        postId={id}
        user={user}
        username={post.username}
        caption={post.caption}
        imageUrl={post.imageUrl}
      />
    ));
  }
  return (
    <div className="container">
      <div className="posts">
        <div className="posts-left">{postsRender}</div>
        <div className="posts-right">
          <InstagramEmbed
            url="https://www.instagram.com/p/B9BIkBYhMwb/"
            // maxWidth="100%"
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Posts;
