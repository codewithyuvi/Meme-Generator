// Cards.jsx
import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cards() {
  const [memes, setMemes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMemes() {
      try {
        const res = await axios.get("https://api.imgflip.com/get_memes");
        setMemes(res.data.data.memes); // Get memes array from response
      } catch (error) {
        console.error("Failed to fetch memes:", error);
      }
    }

    fetchMemes();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom >
        Select a Meme Template
      </Typography>

      <Grid container spacing={3}>
        {memes.map((meme) => (
          <Grid item key={meme.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="200"
                image={meme.url}
                alt={meme.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {meme.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate("/edit-meme", { state: meme })}
                >
                  Use This Template
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Cards;
