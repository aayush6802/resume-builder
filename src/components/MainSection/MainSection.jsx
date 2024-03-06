import React, { useContext, useRef, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import Editor from "../Editor/Editor";
import ContextAPI from "../../contextAPI/contextAPI";
import { themeColor } from "../../App";
import Resume from "../Resume/Resume";
import ReactToPrint, { useReactToPrint } from "react-to-print";

const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];

const MainSection = () => {
  const { resumeInformation, setResumeInformation, sections } =
    useContext(ContextAPI);
  const resumeRef = useRef();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        maxWidth: "100vw",
        m: "auto",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "2.5rem",
          paddingTop: "50px",
          fontFamily: "Bricolage Grotesque",
        }}
      >
        Resume Builder
      </Typography>
      <Editor sections={sections} information={resumeInformation} />
      <Resume />
    </Stack>
  );
};

export default MainSection;
