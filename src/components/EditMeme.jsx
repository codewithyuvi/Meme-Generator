// EditMeme.jsx - Gamified Meme Editor
import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Box,
  Stack,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function EditMeme() {
  const navigate = useNavigate();
  const location = useLocation();
  const meme = location.state;

  // Imgflip creds (dev only)
  const IMGFLIP_USERNAME = "YUVRAJBANSAL";
  const IMGFLIP_PASSWORD = "my@new#password";

  const [captions, setCaptions] = useState(
    Array(meme?.box_count || 0).fill("")
  );
  const [previewUrl, setPreviewUrl] = useState(meme?.url || "");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  if (!meme) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No meme selected.</Typography>
        <Button onClick={() => navigate("/cards")}>Go Back</Button>
      </Box>
    );
  }

  const handleCaptionChange = (index, value) => {
    const newCaptions = [...captions];
    newCaptions[index] = value;
    setCaptions(newCaptions);
  };

  const updatePreview = async (currentCaptions) => {
    if (!meme.id) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("template_id", meme.id);
      params.append("username", IMGFLIP_USERNAME);
      params.append("password", IMGFLIP_PASSWORD);
      (currentCaptions || captions).forEach((text, i) => {
        params.append(`boxes[${i}][text]`, text || " ");
      });
      const response = await axios.post(
        "https://api.imgflip.com/caption_image",
        params.toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      if (response.data.success) {
        setPreviewUrl(response.data.data.url);
      }
    } catch (error) {
      console.error("Imgflip API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateAiCaptions = async () => {
    setAiLoading(true);
    try {
      const endpoint =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDSHqp_MwRDH5WsSRWzEkedBPx6pE2eA7w";
      const promptBody = {
        contents: [
          {
            parts: [
              {
                text: `Generate a funny meme caption in hinglish with exactly ${meme.box_count} lines for this template: ${meme.name}. Each line should be witty. Return only the lines.`,
              },
            ],
          },
        ],
      };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promptBody),
      });
      const data = await res.json();
      const responseText =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const lines = responseText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(0, meme.box_count);
      while (lines.length < meme.box_count) lines.push("");
      setCaptions(lines);
      await updatePreview(lines);
    } catch (err) {
      console.error("Gemini API error:", err);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => updatePreview(), 500);
    return () => clearTimeout(timeout);
  }, [captions]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 4,
        mt: { xs: "60px", md: "63px" },
        px: { xs: 2, md: 6 },
        py: 4,
        minHeight: "100vh",
        background: `
      radial-gradient(circle at top left, rgba(248, 199, 216, 0.15), transparent 60%),
      radial-gradient(circle at bottom right, rgba(155, 223, 255, 0.15), transparent 60%),
      linear-gradient(135deg, #c2c2c2ff 0%, #1a1a2e 100%)
    `,
      }}
    >
      {/* Meme Preview */}
      <Card
        sx={{
          flex: 1,
          maxWidth: 500,
          borderRadius: 4,
          background:
            "linear-gradient(145deg, rgba(40,40,60,0.95), rgba(20,20,40,0.95))",
          boxShadow: "0 4px 15px rgba(0,0,0,0.7), 0 0 15px rgba(255,64,129,0.4)",
          color: "white",
        }}
      >
        <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
          <Button
            size="small"
            onClick={() => navigate("/cards")}
            sx={{
              color: "#ff4081",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { textShadow: "0 0 10px rgba(255,64,129,0.8)" },
            }}
          >
            ← Back
          </Button>
        </CardActions>
        <CardMedia
          component="img"
          image={previewUrl}
          alt={meme.name}
          sx={{
            objectFit: "contain",
            maxHeight: 400,
            px: 2,
            pb: 2,
          }}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#ffeb3b",
              textShadow: "0 0 6px rgba(255,235,59,0.7)",
            }}
          >
            {meme.name}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Box Count: {meme.box_count}
          </Typography>
        </CardContent>
      </Card>

      {/* Caption Editor */}
      <Box flex={1}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Press Start 2P', cursive",
            mb: 2,
            color: "#00e676",
            textShadow: "0 0 8px rgba(0,230,118,0.7)",
          }}
        >
          ✍️ Edit Meme Captions
        </Typography>

        <Button
          variant="contained"
          onClick={generateAiCaptions}
          disabled={aiLoading}
          sx={{
            mb: 3,
            backgroundColor: "#ff4081",
            fontWeight: "bold",
            borderRadius: "20px",
            "&:hover": { backgroundColor: "#f50057" },
          }}
        >
          {aiLoading ? <CircularProgress size={24} color="inherit" /> : "✨ Generate by AI"}
        </Button>

        {loading && (
          <Typography variant="body2" sx={{ color: "#aaa", mb: 2 }}>
            Updating preview...
          </Typography>
        )}

        <Stack spacing={2}>
          {captions.map((text, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Text Line ${index + 1}`}
              variant="filled"
              value={text}
              onChange={(e) => handleCaptionChange(index, e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: { color: "#aaa" },
              }}
              sx={{
                "& .MuiFilledInput-root": {
                  borderRadius: "12px",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
                },
              }}
            />
          ))}
        </Stack>

        <Typography variant="caption" sx={{ display: "block", mt: 3, opacity: 0.7 }}>
          ⚠️ Sometimes Imgflip might shift the text boxes a bit — adjust manually if needed.
        </Typography>
      </Box>
    </Box>
  );
}

export default EditMeme;
