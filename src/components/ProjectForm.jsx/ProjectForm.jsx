import React, { useContext, useEffect, useState } from "react";
import { TextField, Stack, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContextAPI from "../../contextAPI/contextAPI";
import { toast } from "react-toastify";

const ProjectForm = ({ Chip, activeSectionKey }) => {
  const {
    resumeInformation,
    setResumeInformation,
    sections,
    activeInformation,
    activeChipIndex,
    setActiveChipIndex,
  } = useContext(ContextAPI);

  const localData = JSON.parse(localStorage.getItem(sections.projects)) || {
    projectName: "",
    link: "",
    startDate: "",
    endDate: "",
    projectPoints: [],
  };
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem(sections.projects)) || {
      projectName: "",
      link: "",
      startDate: "",
      endDate: "",
      projectPoints: [],
    }
  );

  const handleProjectPointChange = (index, value) => {
    const updatedProjectPoints = [...formData.projectPoints];
    updatedProjectPoints[index] = value;
    setFormData({ ...formData, projectPoints: updatedProjectPoints });
  };

  const handleAddProjectPoint = () => {
    if (formData?.projectPoints?.length < 4) {
      setFormData({
        ...formData,
        projectPoints: [...formData.projectPoints, ""],
      });
    } else {
      toast.error("Maximum 4 work points can be added.");
    }
  };

  const handleRemoveProjectPoint = (index) => {
    const updatedProjectPoints = formData.projectPoints.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, projectPoints: updatedProjectPoints });
  };

  const handleSubmit = () => {
    if (!formData.projectName) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (resumeInformation[sections.projects]?.details[activeChipIndex]) {
      let data = resumeInformation[sections.projects];
      data.details[activeChipIndex] = formData;
      setResumeInformation({
        ...resumeInformation,
        [sections[activeSectionKey]]: data,
      });
    } else {
      const data = {
        id: sections[activeSectionKey],
        sectionTitle: sections[activeSectionKey],
        details: resumeInformation[sections.projects]?.details?.push(formData),
      };
      setResumeInformation({
        ...resumeInformation,
        [sections[activeSectionKey]]: data,
      });
    }
    // store the projects into localstoreage
    localStorage.setItem(sections.projects, JSON.stringify(formData));
  };

  useEffect(() => {
    // write a code to get the data from localstorage and put it in resumeInfromation
    const localData = JSON.parse(localStorage.getItem(sections.projects)) || {
      projectName: "",
      link: "",
      startDate: "",
      endDate: "",
      projectPoints: [],
    };
    setResumeInformation({
      ...resumeInformation,
      [sections.projects]: {
        id: sections.projects,
        sectionTitle: "",
        details: [localData],
      },
    });
    setFormData({
      ...resumeInformation[sections.projects]?.details[activeChipIndex],
    });
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
        label="Project Name"
        variant="outlined"
        fullWidth
        value={formData.projectName || ""}
        onChange={(e) =>
          setFormData({ ...formData, projectName: e.target.value })
        }
      />
      <TextField
        label="Link"
        variant="outlined"
        fullWidth
        value={formData.link || ""}
        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
      />
      <Stack direction="row" alignItems="center" spacing={1}>
        <TextField
          label="Start Date"
          variant="outlined"
          type="date"
          fullWidth
          value={formData.startDate || ""}
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
          value={formData.endDate || ""}
          onChange={(e) =>
            setFormData({ ...formData, endDate: e.target.value })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>
      {formData?.projectPoints?.map((point, index) => (
        <Stack direction="row" alignItems="center" key={index}>
          <TextField
            label={`Project Point ${index + 1}`}
            variant="outlined"
            fullWidth
            value={point || ""}
            onChange={(e) => handleProjectPointChange(index, e.target.value)}
          />
          <IconButton
            aria-label="delete"
            onClick={() => handleRemoveProjectPoint(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleAddProjectPoint}
        disabled={formData?.projectPoints?.length >= 4}
      >
        Add Project Point
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={resumeInformation[sections.projects]?.details?.length >= 4}
      >
        Save
      </Button>
    </Stack>
  );
};

export default ProjectForm;
