// import React, { useState } from "react";
// import {
//   Autocomplete,
//   TextField,
//   Checkbox,
//   Chip,
//   Box,
// } from "@mui/material";

// // 定義選項資料
// const colorOptions = [
//   { label: "Red", color: "#f44336" },
//   { label: "Blue", color: "#2196f3" },
//   { label: "Green", color: "#4caf50" },
//   { label: "Yellow", color: "#ffeb3b" },
//   { label: "Purple", color: "#9c27b0" },
// ];

// export default function ColorMultiSelect() {
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   return (
//     <Autocomplete
//       className="w-1/2"
//       multiple
//       disableCloseOnSelect
//       options={colorOptions}
//       getOptionLabel={(option) => option.label}
//       value={selectedOptions}
//       onChange={(event, newValue) => {
//         setSelectedOptions(newValue);
//       }}
//       isOptionEqualToValue={(option, value) => option.label === value.label}
//       renderOption={(props, option, { selected }) => (
//         <li {...props}>
//           <Checkbox
//             style={{ marginRight: 8 }}
//             checked={selected}
//           />
//           <Box
//             sx={{
//               width: 14,
//               height: 14,
//               backgroundColor: option.color,
//               borderRadius: "50%",
//               marginRight: 1,
//             }}
//           />
//           {option.label}
//         </li>
//       )}
//       renderTags={(value, getTagProps) =>
//         value.map((option, index) => (
//           <Chip
//             key={option.label}
//             label={option.label}
//             {...getTagProps({ index })}
//             sx={{
//               backgroundColor: option.color,
//               color: "#fff",
//             }}
//           />
//         ))
//       }
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           variant="outlined"
//           label="選擇顏色"
//           placeholder="請選擇"
//           className="w-1/2"
//         />
//       )}
//     />
//   );
// }

import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
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
      {colorOptions.map((option) => (
        <ColorToggleButton
          key={option.color}
          value={option.color}
          selectedcolor={option.color}
          aria-label={option.color}
        >
          {selectedColors.includes(option.color) && <CheckIcon />}
        </ColorToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
