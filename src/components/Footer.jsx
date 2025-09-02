// Footer.jsx - Gamified footer with neon glow & retro vibe
import React from "react";
import { Box, Typography, Link, Stack, IconButton, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  const year = new Date().getFullYear();
  return (
<<<<<<< HEAD
    <Box
      component="footer"
      sx={{
        mt: 6,
        pt: 6,
        pb: 3,
        px: { xs: 2, sm: 6 },
        background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",
        color: "white",
        borderTop: "2px solid rgba(255,64,129,0.5)",
        boxShadow: "0 -2px 15px rgba(255,64,129,0.3)",
      }}
    >
      {/* Top section */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={4}
      >
        {/* Brand */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Press Start 2P', cursive",
            fontWeight: "bold",
            color: "#ff4081",
            textShadow: "0 0 8px rgba(255,64,129,0.8)",
          }}
        >
          Memeify 🎮
        </Typography>

        {/* Navigation */}
        <Stack direction="row" spacing={4}>
          {["Home", "About", "Create"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              underline="none"
              sx={{
                fontWeight: "bold",
                color: "white",
                textShadow: "0 0 5px rgba(255,255,255,0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#ff4081",
                  textShadow: "0 0 10px rgba(255,64,129,0.8)",
                },
              }}
            >
              {item}
            </Link>
          ))}
        </Stack>

        {/* Social Icons */}
        <Stack direction="row" spacing={2}>
          {[ 
            { icon: <FacebookIcon />, url: "https://facebook.com" },
            { icon: <TwitterIcon />, url: "https://twitter.com" },
            { icon: <InstagramIcon />, url: "https://instagram.com" },
          ].map((social, idx) => (
            <IconButton
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener"
              sx={{
                color: "white",
                "&:hover": {
                  color: "#ff4081",
                  textShadow: "0 0 12px rgba(255,64,129,0.9)",
                },
              }}
            >
              {social.icon}
            </IconButton>
          ))}
        </Stack>
      </Stack>

      <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

      {/* Bottom copyright */}
      <Typography
        variant="body2"
        textAlign="center"
        sx={{ opacity: 0.7, fontSize: "0.85rem" }}
      >
        Yuvraj Bansal &copy; {year} Memeify. Leveling up your meme game 🚀
      </Typography>
    </Box>
=======
    <footer>
      <p>Yuvraj Bansal | Copyright ⓒ {year}</p>
    </footer>
>>>>>>> accb8cf1d07571212779ba9b35876b5ddd401568
  );
}

export default Footer;
