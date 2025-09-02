// Cards.jsx - Gamified Meme Template Cards
import React, { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cards() {
  const [memes, setMemes] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMemes() {
      try {
        const res = await axios.get("https://api.imgflip.com/get_memes");
        setMemes(res.data.data.memes);
      } catch (error) {
        console.error("Failed to fetch memes:", error);
      }
    }
    fetchMemes();
  }, []);

  const filteredMemes = useMemo(() => {
    return memes.filter((meme) =>
      meme.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [memes, filterText]);

  const getBadge = (index) => {
    if (index % 5 === 0) return { label: "Legendary ⭐", color: "warning", icon: <StarIcon /> };
    if (index % 3 === 0) return { label: "Hot 🔥", color: "error", icon: <WhatshotIcon /> };
    return null;
  };

  return (
    <Box
  sx={{
    pt: { xs: 7, md: 9 }, // offset for header height (56px mobile, 64px+ desktop)
    px: { xs: 2, md: 4 },
    minHeight: "100vh",
    background: `
      radial-gradient(circle at top left, rgba(248, 199, 216, 0.15), transparent 60%),
      radial-gradient(circle at bottom right, rgba(155, 223, 255, 0.15), transparent 60%),
      linear-gradient(135deg, #c2c2c2ff 0%, #1a1a2e 100%)
    `,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }}
>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        textAlign="center"
        sx={{
          fontFamily: "'Press Start 2P', cursive",
          color: "#ff4081",
          textShadow: "0 0 8px rgba(255,64,129,0.7)",
        }}
      >
        🎮 Select Your Meme Template
      </Typography>

      {/* Filter Search */}
      <Box maxWidth={400} mx="auto" mb={4}>
        <TextField
          fullWidth
          size="small"
          label="Search Memes"
          variant="outlined"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Meme Cards Grid */}
      <Grid container spacing={4} justifyContent="center">
        {filteredMemes.map((meme, index) => {
          const badge = getBadge(index);
          return (
            <Grid item key={meme.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  maxWidth: 345,
                  height: "100%",
                  borderRadius: 4,
                  background:
                    "linear-gradient(145deg, rgba(40,40,60,0.95), rgba(20,20,40,0.95))",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.6), 0 0 10px rgba(255,64,129,0.4)",
                  transform:
                    hovered === meme.id
                      ? "rotateX(3deg) rotateY(-3deg) scale(1.05)"
                      : "none",
                  transition: "all 0.15s ease-in-out", // faster hover effect
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={() => setHovered(meme.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Badge */}
                {badge && (
                  <Chip
                    icon={badge.icon}
                    label={badge.label}
                    color={badge.color}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      fontWeight: "bold",
                      boxShadow: "0 0 8px rgba(0,0,0,0.4)",
                      zIndex: 2,
                    }}
                  />
                )}

                {/* Image - show fully */}
                <CardMedia
                  component="img"
                  height="220"
                  image={meme.url}
                  alt={meme.name}
                  sx={{
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    objectFit: "contain", // ensures full image is visible
                    bgcolor: "#0d0d16", // dark backdrop behind transparent parts
                    transition: "transform 0.2s ease",
                    transform: hovered === meme.id ? "scale(1.02)" : "scale(1)",
                  }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    noWrap
                    title={meme.name}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    {meme.name}
                  </Typography>
                </CardContent>

                {/* Actions - always slightly visible */}
                <CardActions
                  sx={{
                    justifyContent: "center",
                    gap: 1,
                    pb: 2,
                    opacity: hovered === meme.id ? 1 : 0.3, // faint when not hovered
                    transition: "opacity 0.2s ease-in-out",
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#00e676",
                      "&:hover": { bgcolor: "#00c853" },
                      borderRadius: "20px",
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/edit-meme", { state: meme });
                    }}
                  >
                    Use Template
                  </Button>
                  <IconButton
                    sx={{ color: "#ff4081" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: "#29b6f6" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Cards;
