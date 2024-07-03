import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function FilterCheckBox({ label, checked, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.checked); // Pass the new checked status to the onChange handler
  };

  return (
    <FormControlLabel
      sx={{ width: "100%", height: "100%" }}
      control={<Checkbox checked={checked} onChange={handleChange} />} // Use the handleChange function for onChange event
      label={label}
    />
  );
}
