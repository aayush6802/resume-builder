import { Box, Container } from "@mui/material";
import "./App.css";
import Header from "./components/Header/Header";
import MainSection from "./components/MainSection/MainSection";
import ContextAPI from "./contextAPI/contextAPI";
import { useState } from "react";

export const themeColor = "#31c6d4";
// export const themeColor = "#31c657";

const sections = {
  basicInfo: "Basic Info",
  workExp: "Work Experience",
  projects: "Projects",
  education: "Education",
  skills: "Skills",
  achievements: "Achievements",
  hobbies: "Hobbies",
  summary: "Summary",
};

const dummyData = {
  jobTitle: "Front-End Developer",
  companyName: "Tech Solutions Inc.",
  location: "City, Country",
  startDate: "2020-06-01",
  endDate: "2022-03-15",
  workPoints: [
    "Collaborated with UI/UX designers to implement responsive web designs.",
    "Utilized modern JavaScript frameworks for building interactive user interfaces.",
  ],
};

function App() {
  const STORAGE_KEY = "resumeInformation";
  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: "",
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: "",
      details: [],
    },
    [sections.projects]: {
      id: sections.projects,
      sectionTitle: "",
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: "",
      details: [],
    },
    [sections.skills]: {
      id: sections.skills,
      sectionTitle: "",
      points: [],
    },
    [sections.achievements]: {
      id: sections.achievements,
      sectionTitle: "",
      points: [],
    },
    [sections.hobbies]: {
      id: sections.hobbies,
      sectionTitle: "",
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: "",
      detail: "",
    },
    // [sections.others]: {
    //   id: sections.others,
    //   sectionTitle: "",
    //   detail: {},
    // },
  });
  const [activeInformation, setActiveInformation] = useState(
    resumeInformation[sections[Object.keys(sections)[0]]]
  );
  const [activeChipIndex, setActiveChipIndex] = useState(0);
  const [activeColor, setActiveColor] = useState(colors[0]);
  const value = {
    resumeInformation,
    setResumeInformation,
    sections,
    activeInformation,
    setActiveInformation,
    activeChipIndex,
    setActiveChipIndex,
    colors,
    activeColor,
    setActiveColor,
    STORAGE_KEY,
  };

  return (
    <ContextAPI.Provider value={value}>
      <Box>
        <Header />
        <MainSection />
      </Box>
    </ContextAPI.Provider>
  );
}

export default App;
