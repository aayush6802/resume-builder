import React, { useState } from "react";
import { TextField, Stack, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const OthersForm = () => {
  const [formData, setFormData] = useState({
    sections: [],
  });

  const handleAddSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { title: "", description: "" }],
    });
  };

  const handleRemoveSection = (index) => {
    const updatedSections = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleSectionTitleChange = (index, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[index].title = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleSectionDescriptionChange = (index, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[index].description = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleSubmit = () => {
    // Here you can perform actions with the gathered data
    console.log("Submitted data:", formData);
  };

  return (
    <Stack spacing={2} mt={2}>
      {formData.sections.map((section, index) => (
        <div key={index}>
          <TextField
            label={`Section ${index + 1} Title`}
            variant="outlined"
            fullWidth
            value={section.title}
            onChange={(e) => handleSectionTitleChange(index, e.target.value)}
          />
          <TextField
            label={`Section ${index + 1} Description`}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={section.description}
            onChange={(e) =>
              handleSectionDescriptionChange(index, e.target.value)
            }
          />
          <IconButton
            aria-label="delete"
            onClick={() => handleRemoveSection(index)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <Button variant="outlined" color="primary" onClick={handleAddSection}>
        Add Section
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
    </Stack>
  );
};

export default OthersForm;
