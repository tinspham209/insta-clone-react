import { Button, Input } from "@material-ui/core";
// import firebase from "firebase/app";
import React, { useState } from "react";
import { db, storage } from "../../firebase";
import LinearProgressWithLabel from "../UI/Progress/Progress";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const { username } = props;
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress func
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // error func
        console.log("error uploadTask: ", error);
        alert(error.message);
      },
      () => {
        // complete func
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image & caption inside db
            db.collection("posts").add({
              // timestamp: firebase.firestore.FieldValue.serverTimestamp,
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <Input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      />
      <Input type="file" onChange={handleChange} />
      <LinearProgressWithLabel value={progress} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default ImageUpload;
