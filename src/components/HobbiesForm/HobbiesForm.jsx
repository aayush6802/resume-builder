import React, { useContext, useState } from "react";
import { TextField, Stack, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContextAPI from "../../contextAPI/contextAPI";

const HobbiesForm = () => {
  const { sections, resumeInformation, setResumeInformation } =
    useContext(ContextAPI);
  const [formData, setFormData] = useState({
    title: "",
    points: [],
  });

  const handleAddHobby = () => {
    if (formData.points.length < 4) {
      setFormData({ ...formData, points: [...formData.points, ""] });
    }
  };

  const handleRemoveHobby = (index) => {
    const updatedHobbies = formData.points.filter((_, i) => i !== index);
    setFormData({ ...formData, points: updatedHobbies });
  };

  const handleHobbyChange = (index, value) => {
    const updatedHobbies = [...formData.points];
    updatedHobbies[index] = value;
    setFormData({ ...formData, points: updatedHobbies });
  };

  const handleSubmit = () => {
    // Here you can perform actions with the gathered data
    console.log("Submitted data:", formData);
    const filteredHobbies = formData.points.filter((hobbie) => hobbie !== "");
    const updatedHobbies = [
      // ...resumeInformation[sections.skills].points,
      ...filteredHobbies,
    ];

    const updatedData = {
      ...resumeInformation[sections.hobbies],
      points: updatedHobbies,
    };

    setResumeInformation({
      ...resumeInformation,
      [sections.hobbies]: updatedData,
    });
  };

  const isAddButtonDisabled = formData.points.length >= 4;

  return (
    <Stack spacing={2} mt={2}>
      {/* <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      /> */}
      {formData.points.map((hobby, index) => (
        <Stack direction="row" alignItems="center" key={index}>
          <TextField
            label={`Hobby ${index + 1}`}
            variant="outlined"
            fullWidth
            value={hobby}
            onChange={(e) => handleHobbyChange(index, e.target.value)}
          />
          <IconButton
            aria-label="delete"
            onClick={() => handleRemoveHobby(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleAddHobby}
        disabled={isAddButtonDisabled}
      >
        Add Hobby
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
    </Stack>
  );
};

export default HobbiesForm;
