import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import AuthContext from "../../AuthContext/AuthContext";

function BooksCard() {
  let {
    allBooksData,
    AllBooks,
    deleteBookRes,
    user,
    DeleteBook,
    EditBook,
    editBookSuccess,
    setEditBookSuccess,
    addBookRes,
  } = useContext(AuthContext);

  useEffect(() => {
    AllBooks();
  }, []);

  return (
    <div>
      {addBookRes ? <Alert>{addBookRes}</Alert> : null}
      {deleteBookRes ? <Alert severity="success">{deleteBookRes}</Alert> : null}
      {editBookSuccess ? (
        <Alert
          onClose={() => {
            setEditBookSuccess(null);
          }}
          severity="success"
        >
          {editBookSuccess}
        </Alert>
      ) : null}
      <Grid spacing={{ xs: 1, sm: 2, md: 3 }} container>
        {allBooksData
          ? allBooksData.map((obj) => (
              <Grid item xl={3} xs={12} sm={6} lg={4}>
                <Card
                  sx={{
                    maxWidth: 345,
                    margin: "10px auto",
                    display: "felx",
                    flexWrap: "wrap",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={obj.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {obj.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {obj.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {user && (
                      <div>
                        <Button onClick={() => EditBook(obj.id)} size="small">
                          update
                        </Button>
                        <Button onClick={() => DeleteBook(obj.id)} size="small">
                          delete
                        </Button>
                      </div>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    </div>
  );
}

export default BooksCard;
