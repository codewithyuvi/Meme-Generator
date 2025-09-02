// Footer.jsx - Gamified footer with neon glow & retro vibe
import React from "react";
import { Box, Typography, Link, Stack, IconButton, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Yuvraj Bansal | Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
