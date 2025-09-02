// Header.jsx - Gamified Header with XP bar, icons, and playful UI
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Header() {
  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        elevation={6}
        sx={{
          backdropFilter: "blur(10px)",
          bgcolor: "rgba(30, 30, 60, 0.85)", // dark gamer vibe
          px: { xs: 2, sm: 4 },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo / Brand */}
          <Typography
            variant="h4"
            component="a"
            href="/"
            sx={{
              fontWeight: "bold",
              color: "white",
              textDecoration: "none",
              letterSpacing: "0.1em",
              fontFamily: "'Press Start 2P', cursive",
            }}
          >
            Memeify 🎮
          </Typography>

          {/* Navigation Links */}
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Button
              href="/"
              sx={{
                backgroundColor: "#ff4081",
                color: "white",
                fontWeight: "bold",
                borderRadius: "20px",
                px: 3,
                py: 1,
                "&:hover": { bgcolor: "#f50057" },
                boxShadow:
                  "0px 4px 8px rgba(255, 64, 129, 0.6), 0px 2px 4px rgba(0,0,0,0.3)",
                textTransform: "none",
                animation: "pulse 1.5s infinite",
                "@keyframes pulse": {
                  "0%": { boxShadow: "0 0 0 0 rgba(255,64,129,0.7)" },
                  "70%": { boxShadow: "0 0 0 15px rgba(255,64,129,0)" },
                  "100%": { boxShadow: "0 0 0 0 rgba(255,64,129,0)" },
                },
              }}
            >
              Home
            </Button>
            <Button
              href="/about"
              sx={{
                backgroundColor: "#ff4081",
                color: "white",
                fontWeight: "bold",
                borderRadius: "20px",
                px: 3,
                py: 1,
                "&:hover": { bgcolor: "#f50057" },
                boxShadow:
                  "0px 4px 8px rgba(255, 64, 129, 0.6), 0px 2px 4px rgba(0,0,0,0.3)",
                textTransform: "none",
                animation: "pulse 1.5s infinite",
                "@keyframes pulse": {
                  "0%": { boxShadow: "0 0 0 0 rgba(255,64,129,0.7)" },
                  "70%": { boxShadow: "0 0 0 15px rgba(255,64,129,0)" },
                  "100%": { boxShadow: "0 0 0 0 rgba(255,64,129,0)" },
                },
              }}
            >
              About
            </Button>
            <Avatar
              alt="User XP"
              src="https://i.pravatar.cc/40"
              sx={{ border: "2px solid white", cursor: "pointer" }}
            />
          </Stack>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export default Header;
