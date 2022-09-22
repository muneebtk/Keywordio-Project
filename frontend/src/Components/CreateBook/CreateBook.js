import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../AuthContext/AuthContext";

function CreateBook() {
  let {
    AddBook,
    editBookData,
    putEditBookData,
    EditBook,
    setDes,
    setTitle,
    title,
    des,
  } = useContext(AuthContext);
  let [image, setImage] = useState();
  // let [title,setTitle] = useState()
  // let [des,setDes] = useState()
  console.log(editBookData, "edit book");

  const [imageError, setImageError] = useState();
  const [titleError, setTitleError] = useState();
  const [desError, setDesError] = useState();
  let params = useParams();
  let id = params.id;
  console.log(id, "idddddaaaaaa");

  useEffect(() => {
    EditBook(id);
  }, []);

  let AddBookValidation = (e) => {
    e.preventDefault();

    if (!title) {
      setTitleError("Please enter title");
      return false;
    }
    if (!des) {
      setDesError("Please enter description");
      return false;
    }
    if (!image) {
      setImageError("Please select an image.");
      return false;
    }
    if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setImageError("Please select a valid image");
      return false;
    }
    AddBook(title, des, image);
  };

  return (
    <div>
      {!editBookData ? (
        <Card
          variant="outlined"
          sx={{
            maxWidth: "500px",
            minWidth: "300px",
            margin: "30px auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid sx={{ padding: "5px 20px" }}>
            <form onSubmit={AddBookValidation}>
              <Typography variant="h4" align="center">
                Add Book
              </Typography>
              <hr />
              <Typography variant="body2">Enter title</Typography>
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                name="title"
              >
                {" "}
              </TextField>
              {titleError ? (
                <Typography color="red" variant="caption">
                  {titleError}
                </Typography>
              ) : null}

              <Typography variant="body2">Enter description</Typography>
              <textarea
                onChange={(e) => setDes(e.target.value)}
                style={{ width: "100%" }}
                id=""
                cols="30"
                rows="10"
                name="description"
              ></textarea>
              {desError ? (
                <Typography color="red" variant="caption">
                  {desError}
                </Typography>
              ) : null}
              <br />

              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <br />
              {imageError ? (
                <Typography color="red" variant="caption">
                  {imageError}
                </Typography>
              ) : null}

              <Box align="center">
                <Button type="submit">Submit</Button>
              </Box>
            </form>
          </Grid>
        </Card>
      ) : null}
    </div>
  );
}

export default CreateBook;
