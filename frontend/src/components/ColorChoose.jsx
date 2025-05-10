import React from "react";
import { ToggleButtonGroup, ToggleButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
  

// 自訂 ToggleButton 樣式
const ColorToggleButton = styled(ToggleButton)(({ selectedcolor }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  padding: 0,
  backgroundColor: selectedcolor,
  color: "#fff",
  border: "none",
  "&.Mui-selected": {
    backgroundColor: selectedcolor,
    border: "none",
  },
  "&:hover": {
    backgroundColor: selectedcolor,
    opacity: 0.8,
  },
}));

export default function ColorToggleSelect({ colorOptions = [], onSelectColors = () => {} }) {

  const [selectedColors, setSelectedColors] = useState([]);

  const handleColorChange = (event, newColors) => {
    setSelectedColors(newColors);
    onSelectColors(newColors);
  };

  return (
    <ToggleButtonGroup
      value={selectedColors}
      onChange={handleColorChange}
      aria-label="color selection"
      sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
    >
      {colorOptions.map((opt) => (
        <Tooltip key={opt.color} title={opt.color} arrow>
        {/* Tooltip 必須包一層能觸發 hover/focus 的元素 */}
        <ColorToggleButton
          value={opt.color}
          selectedcolor={opt.color}
          aria-label={opt.color}
          sx={{
            width: 40,
            height: 40,
            bgcolor: opt.color,
            // border: "1px solid #ccc",
            "&:hover": {
            //   borderColor: "#fff",
              boxShadow: "0 0 0 2px rgba(255,255,255,0.5)",
            },
          }}
        >
          {selectedColors.includes(opt.color) && <CheckIcon />}
        </ColorToggleButton>
      </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}
