import ReactCompareImage from "react-compare-image";
// import colored from '../assets/download(1).jpg';
import colored from '../assets/0531_1132.jpg'
import gray from '../assets/IMG_5237.PNG';
import { useState } from "react";
import { Box, Slider } from "@mui/material";

export default function ColorCompare() {
//   return (
//     <ReactCompareImage
//       leftImage={colored}   // 左：上色
//       rightImage={gray}     // 右：灰階
//       sliderLineColor="#ffffff80"
//       handleSize={30}
//     />
//   );
  const [value, setValue] = useState(50);           // % from 0-100
//   const containerRef = useRef(null);
  const height = 300

  return (
    <Box sx={{ position: "relative", width: "100%", maxWidth: 500 }}>
      {/* 底層灰階 */}
      <img
        src={gray}
        alt="gray"
        style={{ width: "100%", height, objectFit: "cover" }}
      />

      {/* 上層彩色＋ clip-path */}
      <img
        src={colored}
        alt="colored"
        style={{
          position: "absolute",
          inset: 0,
          objectFit: "cover",
          height,
          width: "100%",
          clipPath: `inset(0 ${100 - value}% 0 0)`,
          transition: "clip-path 0.1s linear",
        }}
      />

      {/* 滑桿 */}
      <Slider
        value={value}
        onChange={(_, v) => setValue(v)}
        sx={{
          position: "absolute",
          bottom: -24,
          left: 0,
          width: "100%",
          color: "primary.main",
        }}
      />
    </Box>
  );
}
