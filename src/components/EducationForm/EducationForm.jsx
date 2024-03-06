import React, { useContext, useEffect, useState } from "react";
import { TextField, Stack, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContextAPI from "../../contextAPI/contextAPI";

const EducationForm = ({ Chip, activeSectionKey }) => {
  const {
    resumeInformation,
    setResumeInformation,
    sections,
    activeInformation,
    activeChipIndex,
    setActiveChipIndex,
  } = useContext(ContextAPI);

  const [formData, setFormData] = useState({
    schoolName: "",
    course: "",
    specialisation: "",
    location: "",
    startDate: "",
    endDate: "",
    cgpaOrPercentage: "",
  });

  const handleSubmit = () => {
    if (
      formData.schoolName === "" ||
      formData.course === "" ||
      formData.specialisation === "" ||
      formData.location === ""
    ) {
      return;
    }
    const cgpaOrPercentageValue = parseFloat(formData.cgpaOrPercentage);
    if (cgpaOrPercentageValue >= 100) {
      console.log(
        "CGPA or Percentage must be a valid number and less than 100."
      );
      return;
    }

    console.log("Submitted data:", formData);
    if (resumeInformation[sections.education]?.details[activeChipIndex]) {
      let data = resumeInformation[sections.education];
      data.details[activeChipIndex] = formData;
      setResumeInformation({
        ...resumeInformation,
        [sections[activeSectionKey]]: data,
      });
    } else {
      const data = {
        id: sections[activeSectionKey],
        sectionTitle: sections[activeSectionKey],
        details: resumeInformation[sections.education]?.details?.push(formData),
      };
      setResumeInformation({
        ...resumeInformation,
        [sections[activeSectionKey]]: data,
      });
    }
    console.log(resumeInformation);
  };

  useEffect(() => {
    setFormData(
      resumeInformation[sections.education]?.details[activeChipIndex] || {
        schoolName: "",
        course: "", // Added course field
        specialisation: "",
        location: "",
        startDate: "",
        endDate: "",
        cgpaOrPercentage: "",
      }
    );
    return function cleanup() {};
  }, [activeChipIndex]);

  return (
    <Stack spacing={2} mt={2}>
      {/* <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      /> */}
      <Chip />
      <TextField
        label="School/College Name"
        variant="outlined"
        fullWidth
        value={formData.schoolName}
        onChange={(e) =>
          setFormData({ ...formData, schoolName: e.target.value })
        }
      />
      <TextField
        label="Course" // Added course field
        variant="outlined"
        fullWidth
        value={formData.course}
        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
      />
      <TextField
        label="Specialisation" // Added course field
        variant="outlined"
        fullWidth
        value={formData.specialisation}
        onChange={(e) =>
          setFormData({ ...formData, specialisation: e.target.value })
        }
      />

      <TextField
        label="Location"
        variant="outlined"
        fullWidth
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />
      <Stack spacing={2} mt={2} direction={"row"}>
        <TextField
          label="Start Date"
          variant="outlined"
          type="date"
          fullWidth
          value={formData.startDate}
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          variant="outlined"
          type="date"
          fullWidth
          value={formData.endDate}
          onChange={(e) =>
            setFormData({ ...formData, endDate: e.target.value })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>
      <TextField
        label="CGPA or Percentage"
        variant="outlined"
        fullWidth
        value={formData.cgpaOrPercentage}
        onChange={(e) =>
          setFormData({ ...formData, cgpaOrPercentage: e.target.value })
        }
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={resumeInformation[sections.education]?.details?.length >= 3}
      >
        Save
      </Button>
    </Stack>
  );
};

export default EducationForm;
