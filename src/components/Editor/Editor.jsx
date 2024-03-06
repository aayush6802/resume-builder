import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useContext, useEffect, useState } from "react";
import { themeColor } from "../../App";
import BasicInfoForm from "../BasicInfoForm/BasicInfoForm";
import WorkExperienceForm from "../WorkExperienceForm/WorkExperienceForm";
import ProjectForm from "../ProjectForm.jsx/ProjectForm";
import EducationForm from "../EducationForm/EducationForm";
import SkillsForm from "../SkillsForm/SkillsForm";
import AchievementForm from "../AchievementForm/AchievementForm";
import HobbiesForm from "../HobbiesForm/HobbiesForm";
import SummaryForm from "../SummaryForm/SummaryForm";
import OthersForm from "../OthersForm/OthersForm";
import ContextAPI from "../../contextAPI/contextAPI";
import { dummyData } from "../../data/dummy";
const sectionStyle = {};

const saveButtonStyle = {};

const Editor = ({ sections, information }) => {
  const {
    activeInformation,
    setActiveInformation,
    resumeInformation,
    setResumeInformation,
    activeChipIndex,
    setActiveChipIndex,
  } = useContext(ContextAPI);
  const [activeSectionKey, setActiveSectionKey] = useState(
    Object.keys(sections)[0]
  );

  const [sectionTitle, setSectiontitle] = useState(
    information[sections[Object.keys(sections)[0]]]
  );
  // console.log(activeInformation);
  const removeChip = (index) => {
    const newDetails = activeInformation?.details?.splice(index, 1);
    const newActiveInformation = {
      ...activeInformation,
      details: newDetails,
    };
    setActiveInformation(() => newActiveInformation);
    console.log(newActiveInformation);
    setActiveChipIndex(activeInformation?.details?.length - 1);
    if (activeChipIndex === 0) {
      setActiveChipIndex(0);
    }
  };

  const setChipInformation = (index) => {
    setActiveChipIndex(index);
    console.log(activeChipIndex);
    const activeWorkDetails = activeInformation?.details.filter(
      (e, i) => i === index
    );
    console.log("Active chip data : ", activeWorkDetails);
  };

  const addNewSectionDetail = () => {
    if (activeInformation?.details?.length >= 4) return "";
    setActiveChipIndex(activeInformation?.details?.length + 1);
    const newDetails = activeInformation?.details;
    newDetails.push(dummyData[activeSectionKey]);
    const newActiveInformation = {
      ...activeInformation,
      details: newDetails,
    };
    setActiveInformation(() => newActiveInformation);
    console.log("New Section added : ", newActiveInformation);
  };
  const Chip = () => {
    return (
      <>
        <Stack sx={{}} direction={"row"} spacing={1}>
          {activeInformation?.details
            ? activeInformation?.details?.map((item, i) => (
                <Button
                  key={i}
                  onClick={() => setChipInformation(i)}
                  endIcon={<CloseRoundedIcon onClick={() => removeChip(i)} />}
                  sx={{
                    width: "fit-content",
                    bgcolor: activeChipIndex === i ? themeColor : "#00fff",
                    padding: "8px ",
                    borderRadius: "30px",
                    boxShadow: "0px 0px 5px 5px #d9d3d3",
                    margin: "10px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: activeChipIndex === i ? "white" : "#000",
                    ":hover": {
                      bgcolor: activeChipIndex === i ? themeColor : "#00fff",
                    },
                  }}
                >
                  {sections[activeSectionKey]} {i + 1}
                </Button>
              ))
            : ""}
          <Button
            sx={{
              width: "fit-content",
              bgcolor: "#00fff",
              padding: "8px ",
              borderRadius: "30px",
              margin: "10px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: themeColor,
              ":hover": {
                bgcolor: "#00fff",
              },
            }}
            onClick={addNewSectionDetail}
          >
            New+
          </Button>
        </Stack>
      </>
    );
  };

  const generateSection = () => {
    switch (activeSectionKey) {
      case "basicInfo":
        return <BasicInfoForm key={activeSectionKey} />;
      case "workExp":
        return <WorkExperienceForm key={activeSectionKey} Chip={Chip} />;
      case "projects":
        return <ProjectForm key={activeSectionKey} Chip={Chip} />;
      case "education":
        return <EducationForm key={activeSectionKey} Chip={Chip} />;
      case "skills":
        return <SkillsForm key={activeSectionKey} />;
      case "achievements":
        return <AchievementForm key={activeSectionKey} />;
      case "hobbies":
        return <HobbiesForm key={activeSectionKey} />;
      case "summary":
        return <SummaryForm key={activeSectionKey} />;
      // case "others":
      //   return <OthersForm key={activeSectionKey} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setActiveInformation(information[sections[activeSectionKey]]);
    setSectiontitle(() => sections[activeSectionKey]);
    setResumeInformation(() => {
      return { ...resumeInformation, activeInformation };
    });
  }, [activeSectionKey, activeInformation]);

  return (
    <Stack
      bgcolor={"transparent"}
      margin={"auto"}
      marginTop={"50px"}
      sx={{
        borderRadius: "10px",
        minHeight: "80vh",
        boxShadow: "0px 0px 5px 5px #d9d3d3",
        padding: "10px",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          direction: "row",
          margin: "0 auto",
          bgcolor: "transparent",
        }}
      >
        {Object.keys(sections).map((section) => (
          <Typography
            sx={{
              padding: "10px",
              fontSize: "1.1rem",
              fontWeight: "400",
              fontFamily: "Bricolage Grotesque",
              cursor: "pointer",
              height: "fit-content",
              borderBottom: `2px solid ${
                activeSectionKey === section ? themeColor : "transparent"
              }`,
              color: `${activeSectionKey === section ? themeColor : "black"}`,
            }}
            key={section}
            onClick={() => {
              setActiveSectionKey(section);
              setActiveChipIndex(0);
            }}
          >
            {sections[section]}
          </Typography>
        ))}
      </Stack>
      <Stack mt={2}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={sectionTitle}
          onChange={(e) => setSectiontitle(e.target.value)}
        />
        {generateSection()}
      </Stack>
    </Stack>
  );
};

export default Editor;
