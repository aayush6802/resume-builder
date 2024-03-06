import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Typography,
  ListItem,
  Box,
  Stack,
  Link,
  List,
  Button,
} from "@mui/material";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import LanguageIcon from "@mui/icons-material/Language";
import { useReactToPrint } from "react-to-print";
import { themeColor } from "../../App";
import ContextAPI from "../../contextAPI/contextAPI";
import { Twitter } from "@mui/icons-material";
import ColorizeIcon from "@mui/icons-material/Colorize";
import { ColorPicker, useColor } from "react-color-palette";
// import "react-color-palette/lib/css/styles.css";

const sectionHeadingStyle = {
  textAlign: "left",
  fontWeight: "600",
  borderBottom: "2px solid black",
  paddingBottom: "5px",
  fontSize: "16px",
  margin: "10px 0",
  fontFamily: "Bricolage Grotesque",
};
const listItemStyles = {
  display: "flex",
  alignItems: "center",
  padding: "0",
  mb: "10px",
  textAlign: "justify",
  fontSize: "11px",
  width: "fit-content",
  fontFamily: "Bricolage Grotesque",
};

const contactLinkStyle = {
  fontSize: "12px",
  fontFamily: "Bricolage Grotesque",
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

function convertDateFormat(inputDate) {
  var parts = inputDate?.split("-");
  if (parts?.length === 3) {
    var year = parts[0];
    var month = parts[1];
    var day = parts[2];

    return month + " / " + year;
  } else {
    return "";
  }
}

function shortenLinkedInUrl(fullUrl) {
  if (!fullUrl) return "";
  const urlParts = fullUrl.split("/");
  const usernameIndex = urlParts.indexOf("in") + 1;

  if (usernameIndex > 0 && usernameIndex < urlParts.length) {
    return urlParts[usernameIndex];
  }
  return "";
}
function shortenGitHubUrl(fullUrl) {
  if (!fullUrl) return "";
  const urlParts = fullUrl.split("/");
  const repositoryIndex = urlParts.indexOf("github.com") + 1;

  if (repositoryIndex > 1 && repositoryIndex < urlParts.length) {
    return urlParts.slice(repositoryIndex).join("/");
  } else {
    return "";
  }
}

// Example usage:
const fullLinkedInUrl = "https://www.linkedin.com/in/johndoe";
const shortenedUsername = shortenLinkedInUrl(fullLinkedInUrl);
console.log(shortenedUsername); // Output: johndoe

const Resume = forwardRef(({ props, ref }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pickedColor, setPickedColor] = useColor("hex", "#000");
  const { resumeInformation, sections, colors, activeColor, setActiveColor } =
    useContext(ContextAPI);
  const [columns, setColumns] = useState([[], []]);
  const [source, setSource] = useState();
  const [target, setTarget] = useState();
  const colorPickerRef = useRef();

  // Create a ref to the component that you want to print
  const componentRef = useRef();

  // Use the useReactToPrint hook to get the print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  console.log(resumeInformation);

  const info = {
    basicInfo: resumeInformation[sections.basicInfo],
    workExp: resumeInformation[sections.workExp],
    projects: resumeInformation[sections.projects],
    education: resumeInformation[sections.education],
    skills: resumeInformation[sections.skills],
    achievements: resumeInformation[sections.achievements],
    hobbies: resumeInformation[sections.hobbies],
    summary: resumeInformation[sections.summary],
    others: resumeInformation[sections.others],
  };

  const sectionDiv = {
    [sections.personalInfo]: (
      <div
        key={"personalInfo"}
        className="personal-info"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          minWidth: "30%",
        }}
      >
        <Typography
          variant="h5"
          textAlign={"left"}
          fontFamily={"Bricolage Grotesque"}
          fontWeight={"600"}
        >
          {info.basicInfo.detail?.name}
        </Typography>
        <Typography textAlign={"left"} fontFamily={"Bricolage Grotesque"}>
          {info.basicInfo.detail?.jobTitle}
        </Typography>
      </div>
    ),
    [sections.education]: (
      <div
        key={"education"}
        className="section"
        style={{
          marginTop: "10px",
        }}
        draggable
        onDragOver={() => setTarget(info.education?.id)}
        onDragEnd={() => setSource(info.education?.id)}
      >
        <Typography variant="h5" sx={sectionHeadingStyle}>
          Education
        </Typography>
        {info.education.details.map((edu, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              margin: "10px 0",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                textAlign: "left",
                fontSize: "13px",
                fontWeight: "bold",
                fontFamily: "Bricolage Grotesque",
              }}
            >
              <span>
                {edu.schoolName !== "" ? edu.schoolName + ", " : null}
              </span>
              <span style={{ fontWeight: "normal" }}>
                {" "}
                {edu.location !== "" ? edu.location : null}
              </span>
            </Typography>
            <Typography
              display={"flex"}
              justifyContent={"space-between"}
              padding={0}
              variant="body1"
              sx={{ textAlign: "left", fontWeight: "bold" }}
            >
              <span style={{ fontWeight: "bold", fontSize: "12px" }}>
                {edu.course !== "" ? edu.course + ", " : null}
                <span>
                  {edu.specialisation !== "" ? edu.specialisation : null}
                </span>
              </span>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "10px",
                  color: activeColor,
                }}
              >
                {edu.cgpaOrPercentage !== ""
                  ? parseFloat(edu.cgpaOrPercentage) > 10
                    ? "Percentage : " + edu.cgpaOrPercentage
                    : "CGPA : " + edu.cgpaOrPercentage
                  : null}
              </span>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "10px",
              }}
            >
              {edu.startDate !== "" ? (
                <>
                  <CalendarMonthIcon sx={{ fontSize: "10px" }} />
                  {convertDateFormat(edu.startDate)} -
                  <CalendarMonthIcon sx={{ fontSize: "10px" }} />
                  {convertDateFormat(edu.endDate)}
                </>
              ) : null}
            </Typography>
            {/* <Typography variant="body2">CGPA: </Typography> */}
          </div>
        ))}
      </div>
    ),
    [sections.projects]: (
      <div
        key={"projects"}
        className="section"
        draggable
        onDragOver={() => setTarget(info.projects?.id)}
        onDragEnd={() => setSource(info.projects?.id)}
      >
        <Typography sx={sectionHeadingStyle} variant="h5">
          Projects
        </Typography>
        {info?.projects?.details?.map((project, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography
              sx={{
                textAlign: "left",
                fontSize: "12px",
                fontWeight: "bold",
                fontFamily: "Bricolage Grotesque",
              }}
            >
              <Link
                href={project.link}
                target="_blank"
                sx={{
                  color: activeColor,
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "Bricolage Grotesque",
                }}
              >
                {project.projectName !== "" ? (
                  <>
                    {project.projectName}
                    <LaunchRoundedIcon sx={{ fontSize: "12px" }} />
                  </>
                ) : null}
              </Link>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "10px",
              }}
            >
              {project.startDate !== "" ? (
                <>
                  <CalendarMonthIcon sx={{ fontSize: "10px" }} />
                  {convertDateFormat(project.startDate)} -
                  <CalendarMonthIcon sx={{ fontSize: "10px" }} />
                  {convertDateFormat(project.endDate)}{" "}
                </>
              ) : null}
            </Typography>

            <List
              style={{
                listStyleType: "none",
                listStylePosition: "unset",
              }}
            >
              {project?.projectPoints?.map((point, idx) => (
                <ListItem sx={listItemStyles} key={idx}>
                  ⦿ {point}
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </div>
    ),
    [sections.workExp]: (
      <div
        key={"workExperience"}
        className="section"
        draggable
        onDragOver={() => setTarget(info?.workExp.id)}
        onDragEnd={() => setSource(info?.workExp.id)}
      >
        <Typography sx={sectionHeadingStyle} variant="h5">
          Work Experience
        </Typography>
        {info?.workExp?.details?.map((exp, index) => (
          <div key={index}>
            <Typography
              sx={{
                textAlign: "left",
                fontSize: "12px",
                fontWeight: "bold",
                fontFamily: "Bricolage Grotesque",
              }}
              variant="subtitle1"
            >
              {exp.jobTitle !== "" ? exp.jobTitle : null}{" "}
              {exp.companyName ? ", " + exp.companyName : null}
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                sx={{
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "10px",
                }}
                variant="body2"
              >
                {exp.startDate !== "" ? (
                  <>
                    <CalendarMonthIcon sx={{ fontSize: "10px" }} />
                    {convertDateFormat(exp.startDate)} -
                    <CalendarMonthIcon sx={{ fontSize: "10px" }} />
                    {convertDateFormat(exp.endDate)}
                  </>
                ) : null}
              </Typography>
              <Typography
                sx={{
                  textAlign: "right",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "10px",
                  color: activeColor,
                }}
                variant="body2"
              >
                {exp.location}
              </Typography>
            </Box>

            <List
              style={{
                bgcolor: "yellow",
                listStyleType: "none",
                listStylePosition: "unset",
              }}
            >
              {exp?.workPoints?.map((point, idx) => (
                <ListItem sx={listItemStyles} key={idx}>
                  ⦿ {point}
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </div>
    ),
    [sections.skills]: (
      <div
        key={"skills"}
        className="section"
        draggable
        onDragOver={() => setTarget(info.skills?.id)}
        onDragEnd={() => setSource(info.skills?.id)}
      >
        <Typography sx={sectionHeadingStyle} variant="h5">
          Skills
        </Typography>

        <List
          sx={{
            display: "flex",
            flexWrap: "wrap",
            margin: "5px",
          }}
        >
          {info?.skills?.points?.map((skill, idx) => (
            <ListItem
              sx={{
                ...listItemStyles,
                mb: "0px",
                margin: "5px",
                fontWeight: "bold",
              }}
              key={idx}
            >
              {skill ? `⦿ ${skill}` : null}
            </ListItem>
          ))}
        </List>
      </div>
    ),
    [sections.achievements]: (
      <div
        display={info.achievements.points.length <= 0 ? "none" : "block"}
        key={"achievements"}
        className="section"
        draggable
        onDragOver={() => setTarget(info.achievements?.id)}
        onDragEnd={() => setSource(info.achievements?.id)}
      >
        <Typography
          display={info.achievements.points.length <= 0 ? "none" : "block"}
          sx={sectionHeadingStyle}
          variant="h5"
        >
          Achievements
        </Typography>
        <List
          sx={{
            listStyleType: "none",
            listStylePosition: "unset",
          }}
        >
          {info?.achievements?.points?.map((achievement, index) => (
            <ListItem sx={listItemStyles} key={index}>
              ⦿ {achievement}
            </ListItem>
          ))}
        </List>
      </div>
    ),
    [sections.hobbies]: (
      <div
        key={"hobbies"}
        className="section"
        draggable
        onDragOver={() => setTarget(info.hobbies?.id)}
        onDragEnd={() => setSource(info.hobbies?.id)}
      >
        <Typography sx={sectionHeadingStyle} variant="h5">
          Hobbies
        </Typography>
        <List
          sx={{
            listStyleType: "none",
            listStylePosition: "unset",
          }}
        >
          {info?.hobbies?.points?.map((hobby, index) => (
            <ListItem sx={listItemStyles} key={index}>
              ⦿ {hobby}
            </ListItem>
          ))}
        </List>
      </div>
    ),
  };

  const personalInfo = (
    <div
      key={"personalInfo"}
      className="personal-info"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minWidth: "30%",
      }}
    >
      <Typography
        variant="h5"
        textAlign={"left"}
        fontFamily={"Bricolage Grotesque"}
        fontWeight={"600"}
      >
        {info.basicInfo.detail?.name}
      </Typography>
      <Typography
        textAlign={"left"}
        fontFamily={"Bricolage Grotesque"}
        sx={{
          color: activeColor,
        }}
      >
        {info.basicInfo.detail?.jobTitle}
      </Typography>
    </div>
  );
  const education = (
    <div
      key={"education"}
      className="section"
      style={{
        marginTop: "10px",
      }}
      draggable
      onDragOver={() => setTarget(info.education?.id)}
      onDragEnd={() => setSource(info.education?.id)}
    >
      <Typography variant="h5" sx={sectionHeadingStyle}>
        Education
      </Typography>
      {info.education.details.map((edu, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            margin: "10px 0",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "left",
              fontSize: "13px",
              fontWeight: "bold",
              fontFamily: "Bricolage Grotesque",
            }}
          >
            <span>{edu.schoolName !== "" ? edu.schoolName + ", " : null}</span>
            <span style={{ fontWeight: "normal" }}>
              {" "}
              {edu.location !== "" ? edu.location : null}
            </span>
          </Typography>
          <Typography
            display={"flex"}
            justifyContent={"space-between"}
            padding={0}
            variant="body1"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            <span style={{ fontWeight: "bold", fontSize: "12px" }}>
              {edu.course !== "" ? edu.course + ", " : null}
              <span>
                {edu.specialisation !== "" ? edu.specialisation : null}
              </span>
            </span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "10px",
              }}
            >
              {edu.cgpaOrPercentage !== ""
                ? parseFloat(edu.cgpaOrPercentage) > 10
                  ? "Percentage : " + edu.cgpaOrPercentage
                  : "CGPA : " + edu.cgpaOrPercentage
                : null}
            </span>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "10px",
            }}
          >
            {edu.startDate !== "" ? (
              <>
                <CalendarMonthIcon sx={{ fontSize: "10px" }} />
                {convertDateFormat(edu.startDate)} -
                <CalendarMonthIcon sx={{ fontSize: "10px" }} />
                {convertDateFormat(edu.endDate)}
              </>
            ) : null}
          </Typography>
          {/* <Typography variant="body2">CGPA: </Typography> */}
        </div>
      ))}
    </div>
  );

  const projects = (
    <div
      key={"projects"}
      className="section"
      draggable
      onDragOver={() => setTarget(info.projects?.id)}
      onDragEnd={() => setSource(info.projects?.id)}
    >
      <Typography sx={sectionHeadingStyle} variant="h5">
        Projects
      </Typography>
      {info?.projects?.details?.map((project, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              fontSize: "12px",
              fontWeight: "bold",
              fontFamily: "Bricolage Grotesque",
            }}
          >
            <Link
              href={project.link}
              target="_blank"
              sx={{
                color: "red",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "Bricolage Grotesque",
              }}
            >
              {project.projectName !== "" ? (
                <>
                  {project.projectName}
                  <LaunchRoundedIcon sx={{ fontSize: "12px" }} />
                </>
              ) : null}
            </Link>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "10px",
            }}
          >
            {project.startDate !== "" ? (
              <>
                <CalendarMonthIcon sx={{ fontSize: "10px" }} />
                {convertDateFormat(project.startDate)} -
                <CalendarMonthIcon sx={{ fontSize: "10px" }} />
                {convertDateFormat(project.endDate)}{" "}
              </>
            ) : null}
          </Typography>

          <List
            style={{
              listStyleType: "none",
              listStylePosition: "unset",
            }}
          >
            {project?.projectPoints?.map((point, idx) => (
              <ListItem sx={listItemStyles} key={idx}>
                ⦿ {point}
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
  const workExperience = (
    <div
      key={"workExperience"}
      className="section"
      draggable
      onDragOver={() => setTarget("workExperience")}
      onDragEnd={() => setSource("workExperience")}
    >
      <Typography sx={sectionHeadingStyle} variant="h5">
        Work Experience
      </Typography>
      {info?.workExp?.details?.map((exp, index) => (
        <div key={index}>
          <Typography
            sx={{
              textAlign: "left",
              fontSize: "12px",
              fontWeight: "bold",
              fontFamily: "Bricolage Grotesque",
            }}
            variant="subtitle1"
          >
            {exp.jobTitle !== "" ? exp.jobTitle : null}{" "}
            {exp.companyName ? ", " + exp.companyName : null}
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography
              sx={{
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "10px",
              }}
              variant="body2"
            >
              {exp.startDate !== "" ? (
                <>
                  <CalendarMonthIcon sx={{ fontSize: "10px" }} />
                  {convertDateFormat(exp.startDate)} -
                  <CalendarMonthIcon sx={{ fontSize: "10px" }} />
                  {convertDateFormat(exp.endDate)}
                </>
              ) : null}
            </Typography>
            <Typography
              sx={{
                textAlign: "right",
                display: "flex",
                alignItems: "center",
                fontSize: "10px",
              }}
              variant="body2"
            >
              {exp.location}
            </Typography>
          </Box>
          {/* <ul>
            {exp.workPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul> */}
          <List
            style={{
              bgcolor: "yellow",
              listStyleType: "none",
              listStylePosition: "unset",
            }}
          >
            {exp?.workPoints?.map((point, idx) => (
              <ListItem sx={listItemStyles} key={idx}>
                ⦿ {point}
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </div>
  );

  const contactLinks = (
    <div
      key={"contactLinks"}
      className="contact-links"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "5px",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "10px",
        flexWrap: "wrap",
      }}
    >
      <Typography variant="body2" sx={contactLinkStyle}>
        {info.basicInfo.detail?.email ? (
          <>
            <AlternateEmailRoundedIcon
              sx={{
                color: activeColor,
              }}
            />{" "}
            <Link href="mailto:john@example.com" color="inherit">
              {info.basicInfo.detail?.email}
            </Link>
          </>
        ) : (
          ""
        )}
      </Typography>
      <Typography variant="body2" sx={contactLinkStyle}>
        {info.basicInfo.detail?.phone ? (
          <>
            <LocalPhoneRoundedIcon
              sx={{
                color: activeColor,
              }}
            />
            {info.basicInfo.detail?.phone}
          </>
        ) : (
          ""
        )}
      </Typography>
      <Typography variant="body2" sx={contactLinkStyle}>
        {shortenLinkedInUrl(info.basicInfo.detail?.linkedIn) ? (
          <>
            <LinkedInIcon
              sx={{
                color: activeColor,
              }}
            />{" "}
            <Link href={info.basicInfo.detail?.linkedIn} color="inherit">
              {shortenLinkedInUrl(info.basicInfo.detail?.linkedIn)}
            </Link>
          </>
        ) : (
          ""
        )}
      </Typography>
      <Typography variant="body2" sx={contactLinkStyle}>
        {info.basicInfo.detail?.github ? (
          <>
            <GitHubIcon
              sx={{
                color: activeColor,
              }}
            />{" "}
            <Link href={info.basicInfo.detail?.github} color="inherit">
              {shortenGitHubUrl(info.basicInfo.detail?.github)}
            </Link>
          </>
        ) : (
          ""
        )}
      </Typography>
      <Typography variant="body2" sx={contactLinkStyle}>
        {info.basicInfo.detail?.website ? (
          <>
            <LanguageIcon
              sx={{
                color: activeColor,
              }}
            />{" "}
            <Link href={info.basicInfo.detail?.website} color="inherit">
              {info.basicInfo.detail?.website?.split("//")[1]}
            </Link>
          </>
        ) : (
          ""
        )}
      </Typography>
      <Typography variant="body2" sx={contactLinkStyle}>
        {info.basicInfo.detail?.twitter ? (
          <>
            <Twitter
              sx={{
                color: activeColor,
              }}
            />{" "}
            <Link href={info.basicInfo.detail?.twitter} color="inherit">
              {info.basicInfo.detail?.twitter?.split("//")[1]}
            </Link>
          </>
        ) : (
          ""
        )}
      </Typography>
    </div>
  );
  const skills = (
    <div
      key={"skills"}
      className="section"
      draggable
      onDragOver={() => setTarget(info.skills?.id)}
      onDragEnd={() => setSource(info.skills?.id)}
    >
      <Typography sx={sectionHeadingStyle} variant="h5">
        Skills
      </Typography>
      {/* <ul>
        {dummySkills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul> */}
      <List
        sx={{
          display: "flex",
          flexWrap: "wrap",
          margin: "5px",
        }}
      >
        {info?.skills?.points?.map((skill, idx) => (
          <ListItem
            sx={{
              ...listItemStyles,
              mb: "0px",
              margin: "5px",
              fontWeight: "bold",
            }}
            key={idx}
          >
            {skill ? `⦿ ${skill}` : null}
          </ListItem>
        ))}
      </List>
    </div>
  );
  const achievements = (
    <div
      display={info.achievements.points.length <= 0 ? "none" : "block"}
      key={"achievements"}
      className="section"
      draggable
      onDragOver={() => setTarget("achievements")}
      onDragEnd={() => setSource("achievements")}
    >
      <Typography
        display={info.achievements.points.length <= 0 ? "none" : "block"}
        sx={sectionHeadingStyle}
        variant="h5"
      >
        Achievements
      </Typography>
      <List
        sx={{
          listStyleType: "none",
          listStylePosition: "unset",
        }}
      >
        {info?.achievements?.points?.map((achievement, index) => (
          <ListItem sx={listItemStyles} key={index}>
            ⦿ {achievement}
          </ListItem>
        ))}
      </List>
    </div>
  );
  const summary = (
    <div
      key={"summary"}
      className="section"
      style={{ width: "100%" }}
      onDragOver={() => setTarget(info.summary?.id)}
      onDragEnd={() => setSource(info.summary?.id)}
    >
      {/* <Typography
        variant="h5"
        textAlign={"left"}
        padding={"5px"}
        // borderBottom={"2px solid black"}
        sx={{ textDecoration: "underline" }}
      >
        Career Objective
      </Typography> */}
      <Typography
        fontFamily={"Bricolage Grotesque"}
        variant="body2"
        textAlign={"justify"}
      >
        {info?.summary?.detail}
      </Typography>
    </div>
  );

  const hobbies = (
    <div
      key={"hobbies"}
      className="section"
      draggable
      onDragOver={() => setTarget("hobbies")}
      onDragEnd={() => setSource("hobbies")}
    >
      <Typography sx={sectionHeadingStyle} variant="h5">
        Hobbies
      </Typography>
      <List
        sx={{
          listStyleType: "none",
          listStylePosition: "unset",
        }}
      >
        {info?.hobbies?.points?.map((hobby, index) => (
          <ListItem sx={listItemStyles} key={index}>
            ⦿ {hobby}
          </ListItem>
        ))}
      </List>
    </div>
  );

  const swapSourceTarget = (source, target) => {
    if (!source || !target) return null;
    const tempColumns = [[...columns[0]], [...columns[1]]];
    let sourceRowIndex = columns[0].findIndex((item) => item === source);
    let sourceColumnIndex = 0;
    if (sourceRowIndex < 0) {
      sourceColumnIndex = 1;
      sourceRowIndex = columns[1].findIndex((item) => item === source);
    }
    let targetRowIndex = columns[0].findIndex((item) => item === target);
    let targetColumnIndex = 0;
    if (targetRowIndex < 0) {
      targetColumnIndex = 1;
      targetRowIndex = columns[1].findIndex((item) => item === target);
    }
    const tempSource = tempColumns[sourceColumnIndex][sourceRowIndex];
    tempColumns[sourceColumnIndex][sourceRowIndex] =
      tempColumns[targetColumnIndex][targetRowIndex];
    tempColumns[targetColumnIndex][targetRowIndex] = tempSource;
    setColumns(tempColumns);
  };

  useEffect(() => {
    setColumns([
      [sections.education, sections.projects],
      [
        sections.workExp,
        sections.skills,
        sections.achievements,
        sections.hobbies,
      ],
    ]);
  }, [resumeInformation]);

  useEffect(() => {
    swapSourceTarget(source, target);
  }, [source]);

  useEffect(() => {}, [activeColor]);
  console.log(colorPickerRef);

  return (
    <>
      <Stack
        className="print-section"
        direction={"row"}
        spacing={2}
        display={"flex"}
        justifyContent={"space-around"}
        width={"100%"}
        margin={"50px 0"}
      >
        <Stack direction={"row"} spacing={2} position={"relative"}>
          {colors.map((color) => (
            <span
              key={color}
              onClick={() => setActiveColor(color)}
              style={{
                backgroundColor: color,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                border: `2px solid ${
                  activeColor === color ? "black" : "transparent"
                }`,
              }}
            ></span>
          ))}

          <span
            className="color-picker"
            onClick={toggleColorPicker}
            style={{
              backgroundColor: pickedColor,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              border: `2px solid ${showColorPicker ? "black" : "transparent"}`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ColorizeIcon onClick={() => colorPickerRef.current.click()} />
            {
              <input
                ref={colorPickerRef}
                type="color"
                value={pickedColor}
                onChange={(e) => {
                  setPickedColor(e.target.value);
                  setActiveColor(e.target.value);
                }}
                style={{
                  display: "none",
                  position: "absolute",
                  right: "0px",
                  zIndex: 1,
                }}
              />
            }
          </span>
        </Stack>
        <Button
          variant="contained"
          sx={{
            backgroundColor: themeColor,
            fontFamily: "Bricolage Grotesque",
            fontSize: "1.2rem",
            padding: "10px",
            ":hover": {
              backgroundColor: themeColor,
            },
          }}
          endIcon={<DownloadRoundedIcon />}
          onClick={handlePrint}
        >
          Download
        </Button>
      </Stack>
      <div
        ref={componentRef}
        style={{
          width: "21cm",
          height: "29.7cm",
          boxShadow: "1px 1px 3px 2px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
        }}
        className="print-page"
      >
        <Stack
          item
          md={12}
          width={"100%"}
          // height={"330px"}
          borderBottom={"1px solid black"}
          position={"relative"}
          // top={"-120px"}
          direction={"column"}
          // bgcolor={"cyan"}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            sx={{ margin: "0px 24px", marginTop: "16px" }}
          >
            {personalInfo}
            {contactLinks}
          </Stack>

          <Stack
            justifyContent={"left"}
            position={"relative"}
            left={"0"}
            // bottom={"-220px"}
            sx={{ margin: "8px 24px", marginBottom: "16px" }}
          >
            {summary}
          </Stack>
        </Stack>

        <Box sx={{ display: "flex", position: "relative" }}>
          {/* Left Column */}
          <Box width={"50%"}>
            <Box sx={{ padding: 3 }}>
              {columns[0].map((item, i) => sectionDiv[item])}
            </Box>
          </Box>

          {/* Right Column */}
          <Box width={"50%"}>
            <Box sx={{ padding: 3 }}>
              {columns[1].map((item, i) => sectionDiv[item])}
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
});

export default Resume;
