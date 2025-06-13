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
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function EditMeme() {
  const navigate = useNavigate();
  const location = useLocation();
  const meme = location.state;

  // Expose Imgflip credentials openly as per request
  const IMGFLIP_USERNAME = "YUVRAJBANSAL"; // replace if needed
  const IMGFLIP_PASSWORD = "my@new#password"; // replace if needed

  // Initialize state for captions and preview URL
  const [captions, setCaptions] = useState(
    Array(meme?.box_count || 0).fill("")
  );
  const [previewUrl, setPreviewUrl] = useState(meme?.url || "");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // Handle missing meme
  if (!meme) {
    return (
      <div style={{ padding: "2rem" }}>
        <Typography variant="h6">No meme selected.</Typography>
        <Button onClick={() => navigate("/cards")}>Go Back</Button>
      </div>
    );
  }

  // Update caption locally
  const handleCaptionChange = (index, value) => {
    const newCaptions = [...captions];
    newCaptions[index] = value;
    setCaptions(newCaptions);
  };

  // Function to call Imgflip API directly for preview update
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
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const data = response.data;
      if (data.success) {
        setPreviewUrl(data.data.url);
      } else {
        console.error("Imgflip API error:", data);
      }
    } catch (error) {
      console.error(
        "Error calling Imgflip API:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to generate captions via Gemini API
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
                text: `Generate a funny meme caption in hinglish with exactly ${meme.box_count} lines based on the meme template: ${meme.name}. Each line should be witty and match the typical style of this meme template. Return only the caption lines as plain text, without any extra explanation or formatting.`,
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
      // Split lines and trim, ensure length matches box_count
      const lines = responseText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .slice(0, meme.box_count);
      // If fewer lines, fill remaining with empty
      while (lines.length < meme.box_count) lines.push("");
      setCaptions(lines);
      // Immediately update preview with new captions
      await updatePreview(lines);
    } catch (err) {
      console.error("Gemini API error:", err);
    } finally {
      setAiLoading(false);
    }
  };

  // Effect: whenever captions change by typing, debounce and call updatePreview
  useEffect(() => {
    const timeout = setTimeout(() => {
      updatePreview();
    }, 500);
    return () => clearTimeout(timeout);
  }, [captions]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2rem",
        minHeight: "100vh",
      }}
    >
      {/* Meme Card on Left with live preview */}
      <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            width: 300,
            height: 400,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardActions>
            <Button size="small" onClick={() => navigate("/cards")}>
              ← Back
            </Button>
          </CardActions>
          <CardMedia
            component="img"
            image={previewUrl}
            alt={meme.name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              flexGrow: 1,
            }}
          />
          <Typography gutterBottom variant="h6">
            {meme.name}
          </Typography>
          <CardContent>
            <Typography variant="body2">Box Count: {meme.box_count}</Typography>
          </CardContent>
        </Card>
      </div>

      {/* Input Section on Right */}
      <div style={{ flex: "1", paddingLeft: "2rem" }}>
        <Typography variant="h6">Edit Meme Captions</Typography>
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={generateAiCaptions}
            disabled={aiLoading}
          >
            {aiLoading ? <CircularProgress size={24} /> : "Generate by AI"}
          </Button>
        </div>
        {loading && (
          <Typography variant="body2" color="textSecondary">
            Updating preview...
          </Typography>
        )}
        <div style={{ marginTop: "1rem" }}>
          {captions.map((text, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Text Line ${index + 1}`}
              variant="filled"
              value={text}
              onChange={(e) => handleCaptionChange(index, e.target.value)}
              style={{ backgroundColor: "#fdfd55", marginBottom: "1rem" }}
            />
          ))}
        </div>
        
        <p>
          Sometimes, the website might rearrange the text boxes slightly. If
          that happens, please adjust them manually.
        </p>
      </div>
    </div>
  );
}

export default EditMeme;
