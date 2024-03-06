import React, { useContext, useState } from "react";
import { TextField, Stack, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContextAPI from "../../contextAPI/contextAPI";

const AchievementForm = () => {
  const { sections, resumeInformation, setResumeInformation } =
    useContext(ContextAPI);
  const [formData, setFormData] = useState({
    title: "",
    points: [],
  });

  const handleAddAchievement = () => {
    if (formData.points.length < 4) {
      setFormData({
        ...formData,
        points: [...formData.points, ""],
      });
    }
  };

  const handleRemoveAchievement = (index) => {
    const updatedAchievements = formData.points.filter((_, i) => i !== index);
    setFormData({ ...formData, points: updatedAchievements });
  };

  const handleAchievementChange = (index, value) => {
    const updatedAchievements = [...formData.points];
    updatedAchievements[index] = value;
    setFormData({ ...formData, points: updatedAchievements });
  };

  const handleSubmit = () => {
    // Here you can perform actions with the gathered data
    console.log("Submitted data:", formData);
    // if (!formData?.points?.length > 0) return;
    // filter out the empty strings
    // in array and remove duplicates
    const filteredAchievements = formData.points.filter(
      (achievement) => achievement !== ""
    );
    const updatedAchievements = [
      // ...resumeInformation[sections.skills].points,
      ...filteredAchievements,
    ];

    const updatedData = {
      ...resumeInformation[sections.achievements],
      points: updatedAchievements,
    };

    setResumeInformation({
      ...resumeInformation,
      [sections.achievements]: updatedData,
    });
  };

  return (
    <Stack spacing={2} mt={2}>
      {formData.points.map((achievement, index) => (
        <Stack direction="row" alignItems="center" key={index}>
          <TextField
            label={`Achievement ${index + 1}`}
            variant="outlined"
            fullWidth
            value={achievement}
            onChange={(e) => handleAchievementChange(index, e.target.value)}
          />
          <IconButton
            aria-label="delete"
            onClick={() => handleRemoveAchievement(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleAddAchievement}
        disabled={formData.points.length >= 4}
      >
        Add Achievement
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
    </Stack>
  );
};

export default AchievementForm;
