import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import resumeSvg from "../../assets/resume.svg";

const spanStyle = {
  fontSize: "3.6rem",
  fontWeight: "600",
  backgroundClip: "text",
  backgroundImage: "",
  color: "#31c6d4",
  padding: "0",
  margin: "0",
  fontFamily: "Sans",
  textAlign: "left",
};
const pStyle = {
  fontSize: "3.6rem",
  fontWeight: "600",
  lineHeight: "1.5",
};

const Header = () => {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        maxWidth: "100vw",
        m: "auto",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#d2f7ff",
      }}
    >
      <div>
        <p style={pStyle}>
          A <span style={spanStyle}>Resume</span> <br />
          that stands out!
        </p>
        <p style={pStyle}>
          Make your own resume.
          <br />
          <span style={spanStyle}>It's free! </span>
          <br />
        </p>
      </div>
      <div>
        <img style={{ width: "450px" }} src={resumeSvg} alt="resume" />
      </div>
    </Stack>
  );
};

export default Header;
