import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Stack,
  Button,
  IconButton,
  formControlClasses,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextAPI from "../../contextAPI/contextAPI";

const WorkExperienceForm = ({ Chip, activeSectionKey }) => {
  const {
    resumeInformation,
    setResumeInformation,
    sections,
    activeInformation,
    activeChipIndex,
    setActiveChipIndex,
  } = useContext(ContextAPI);
  const [formData, setFormData] = useState(
    resumeInformation[sections.workExp]?.details[activeChipIndex] || {
      jobTitle: "",
      companyName: "",
      location: "",
      startDate: "",
      endDate: "",
      workPoints: [],
    }
  );

  console.log(
    resumeInformation[sections.workExp]?.details[activeChipIndex]?.workPoints
      ?.length
  );

  const handleWorkPointChange = (index, value) => {
    const updatedWorkPoints = [...formData.workPoints];
    updatedWorkPoints[index] = value;
    setFormData({ ...formData, workPoints: updatedWorkPoints });
  };

  const handleAddWorkPoint = () => {
    if (
      resumeInformation[sections.workExp]?.details[activeChipIndex]?.workPoints
        ?.length < 4
    ) {
      setFormData({
        ...formData,
        workPoints: [...formData.workPoints, ""],
      });
    } else {
      toast.error("Maximum 4 work points can be added.");
    }
  };

  const handleRemoveWorkPoint = (index) => {
    const updatedWorkPoints = formData.workPoints.filter((_, i) => i !== index);
    setFormData({ ...formData, workPoints: updatedWorkPoints });
    //update resumeInformation
  };

  const handleSubmit = () => {
    if (resumeInformation[sections.workExp]?.details[activeChipIndex]) {
      let data = resumeInformation[sections.workExp];
      data.details[activeChipIndex] = formData;
      setResumeInformation({
        ...resumeInformation,
        [sections[activeSectionKey]]: data,
      });
    } else {
      const data = {
        id: sections[activeSectionKey],
        sectionTitle: sections[activeSectionKey],
        details: resumeInformation[sections.workExp]?.details?.push(formData),
      };
      setResumeInformation({
        ...resumeInformation,
        [sections[activeSectionKey]]: data,
      });
    }
  };

  useEffect(() => {
    setFormData(
      resumeInformation[sections.workExp]?.details[activeChipIndex] || {
        jobTitle: "",
        companyName: "",
        location: "",
        startDate: "",
        endDate: "",
        workPoints: [],
      }
    );
    return function cleanup() {};
  }, [resumeInformation, activeChipIndex]);

  return (
    <Stack spacing={2} mt={2}>
      <Chip />

      <TextField
        label="Job Title"
        variant="outlined"
        fullWidth
        value={formData.jobTitle}
        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
      />
      <TextField
        label="Company Name"
        variant="outlined"
        fullWidth
        value={formData.companyName}
        onChange={(e) =>
          setFormData({ ...formData, companyName: e.target.value })
        }
      />
      <TextField
        label="Location"
        variant="outlined"
        fullWidth
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />
      <Stack direction={"row"} spacing={1}>
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
      {formData?.workPoints?.map((point, index) => (
        <Stack direction="row" alignItems="center" key={index}>
          <TextField
            label={`Work Point ${index + 1}`}
            variant="outlined"
            fullWidth
            value={point}
            onChange={(e) => handleWorkPointChange(index, e.target.value)}
          />
          <IconButton
            aria-label="delete"
            onClick={() => handleRemoveWorkPoint(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleAddWorkPoint}
        disabled={
          resumeInformation[sections.workExp]?.details[activeChipIndex]
            ?.workPoints?.length >= 4 ||
          resumeInformation[sections.workExp]?.details?.length >= 3
        }
      >
        Add Work Point
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={
          formData?.workPoints?.length >= 4 ||
          resumeInformation[sections.workExp]?.details?.length >= 3
        }
      >
        Save
      </Button>
      <ToastContainer />
    </Stack>
  );
};

export default WorkExperienceForm;
