import React, { useContext, useEffect, useState } from "react";
import { TextField, Stack, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContextAPI from "../../contextAPI/contextAPI";

const SkillsForm = ({ activeSectionKey }) => {
  const { sections, resumeInformation, setResumeInformation, STORAGE_KEY } =
    useContext(ContextAPI);
  //get skills from local data

  const [formData, setFormData] = useState(
    resumeInformation[sections.skills]?.points?.length || {
      title: "",
      points: [],
    }
  );

  const saveData = () => {
    const updatedData = {
      ...resumeInformation[sections.skills],
      points: formData.points,
    };

    setResumeInformation({
      ...resumeInformation,
      [sections.skills]: updatedData,
    });
  };

  const handleAddSkill = () => {
    setFormData({ ...formData, points: [...formData.points, ""] });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = formData.points.filter((_, i) => i !== index);
    setFormData({ ...formData, points: updatedSkills });
    handleSubmit();
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.points];
    updatedSkills[index] = value;
    setFormData({ ...formData, points: updatedSkills });
  };

  const handleSubmit = () => {
    if (formData.points.length === 0) return;

    const updatedData = {
      ...resumeInformation[sections.skills],
      points: [...formData.points],
    };

    setResumeInformation({
      ...resumeInformation,
      [sections.skills]: updatedData,
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeInformation));
  };

  // useEffect(() => {
  //   if (resumeInformation[sections.skills]?.points?.length <= 0) return null;
  //   const localData = JSON.parse(localStorage.getItem(STORAGE_KEY))
  //     ? JSON.parse(localStorage.getItem(STORAGE_KEY))[sections.skills]
  //     : {
  //         title: "",
  //         points: [],
  //       };
  //   // setFormData(
  //   //   resumeInformation[sections.skills]?.points?.length || {
  //   //     title: "",
  //   //     points: [],
  //   //   }
  //   // );
  //   setFormData(...localData);
  // }, [resumeInformation]);

  return (
    <Stack spacing={2} mt={2}>
      {/* <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      /> */}
      {formData?.points?.map((skill, index) => (
        <Stack direction="row" alignItems="center" key={index}>
          <TextField
            label={`Skill ${index + 1}`}
            variant="outlined"
            fullWidth
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
          />
          <IconButton
            aria-label="delete"
            onClick={() => handleRemoveSkill(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
      <Button variant="outlined" color="primary" onClick={handleAddSkill}>
        Add Skill
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
    </Stack>
  );
};

export default SkillsForm;
