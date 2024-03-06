import React, { useContext, useState } from "react";
import { TextField, Stack, Button } from "@mui/material";
import ContextAPI from "../../contextAPI/contextAPI";

const detailForm = () => {
  const { sections, resumeInformation, setResumeInformation } =
    useContext(ContextAPI);
  const [formData, setFormData] = useState({
    title: "",
    detail: "",
  });

  const handleSubmit = () => {
    console.log("Submitted data:", formData);
    // pose check of summary length of 80 words
    if (formData?.detail?.length <= 0) return;
    // if (formData?.detail?.length > 200) {
    //   alert("Summary should be less than 80 words");
    //   return;
    // }
    //calculate the words length of 80 words
    const summaryLength = formData?.detail?.split(" ").length;
    if (summaryLength > 80) {
      alert("Summary should be less than 80 words");
      return;
    }

    const updatedData = {
      ...resumeInformation[sections.summary],
      detail: formData.detail,
    };

    setResumeInformation({
      ...resumeInformation,
      [sections.summary]: updatedData,
    });
  };

  return (
    <Stack spacing={2} mt={2}>
      {/* <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      /> */}
      <TextField
        label="Summary"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={formData.detail}
        onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
    </Stack>
  );
};

export default detailForm;
