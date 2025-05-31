// import { Stack, Paper, Typography, Box } from "@mui/material";
// import { GpsFixed, Web, Checklist } from "@mui/icons-material";

// function About() {
//     return(
//         <>
//             <div className="p-2 w-full bg-[#3b3e48] text-amber-50 overflow-y-auto">
//                 <div className="flex flex-col items-center">
//                     <h1 className="ml-2">About</h1>
//                 </div>
//                 <br/>
//                 <h2 className="ml-6 mr-6 mt-2 mb-2"> 我們的目標 </h2>
//                 <h3 className="ml-6 mr-6">
//                     我們希望提供一個簡單、實用、不需學習成本的工具，讓使用者可以更快完成配色，專注在創意發想與設計本身。
//                 </h3>
//                 <br/>
//                 <h2 className="ml-6 mr-6 mt-2 mb-2"> 網站簡介 </h2>
//                 <h3 className="ml-6 mr-6">
//                     這個網站是一個簡單實用的工具，幫助使用者為 logo、圖示或其他簡單圖像快速上色。
//                     <br></br>
//                     透過上傳參考圖片，我們會自動擷取其中的代表性色票，使用者可以指定想要幾種顏色，並套用到另一張灰階圖片上，完成快速上色。整個流程不需安裝軟體、不需複雜操作，適合初學者、設計工作者或學生使用。
//                 </h3>
//                 <br/>
//                 <h2 className="ml-6 mr-6 mt-2 mb-2"> 工具特色 </h2>
//                 <ul className="ml-6 mr-6">
//                     <li>色票擷取：從參考圖片中自動抓取代表性色彩</li>
//                     <li>可自訂色彩數量：依照需求選擇色票顏色數量</li>
//                     <li>快速上色：一鍵套用色票到灰階圖，快速完成配色</li>
//                     <li>帳戶系統與色票紀錄：登入後可儲存色票與上色結果，方便日後使用</li>
//                     <li>穩定高效的系統架構：前端使用 React，後端使用 Flask，搭配資料庫儲存使用者資料與色票資訊</li>
//                 </ul>
//             </div>
//         </>
//     );
// }

// export default About;

// import { Stack, Paper, Typography, Box } from "@mui/material";
// import { GpsFixed, Web, Checklist } from "@mui/icons-material";

// const sectionStyle = (color) => ({
//   p: 3,
//   borderRadius: 2,
//   border: `1px solid ${color}`,
//   mb: 4,
//   backdropFilter: "blur(4px)",
//   backgroundColor: "#6B7280"
// });

// export default function About() {
//   return (
//     <Stack
//       sx={{
//         maxWidth: 680,
//         mx: "auto",
//         mt: 2,
//         color: "grey.200",
//       }}
//       spacing={4}
//     >
//         <div className="flex flex-col items-center">
//             <h1 className="ml-2">About</h1>
//         </div>

//       {/* 目標 */}
//       <Paper elevation={3} sx={sectionStyle("#528CFF")}>
//         <Box display="flex" gap={2}>
//           <GpsFixed sx={{ fontSize: 40, color: "#528CFF" }} />
//           <Box>
//             <Typography variant="h6" color="grey.100">
//               我們的目標
//             </Typography>
//             <Typography sx={{ mt: 1, lineHeight: 1.7, color: "white" }}>
//               我們希望提供一個簡單、實用、不需學習成本的工具，讓使用者可以更快完成配色，專注在創意發想與設計本身。
//             </Typography>
//           </Box>
//         </Box>
//       </Paper>

//       {/* 簡介 */}
//       <Paper elevation={3} sx={sectionStyle("#6FCF97")}>
//         <Box display="flex" gap={2}>
//           <Web sx={{ fontSize: 40, color: "#6FCF97" }} />
//           <Box>
//             <Typography variant="h6" color="grey.100">
//               網站簡介
//             </Typography>
//             <Typography sx={{ mt: 1, lineHeight: 1.7, color: "white" }}>
//               這個網站是一個簡單實用的工具，幫助使用者為 logo、圖示或其他簡單圖像快速上色。透過上傳參考圖片...
//             </Typography>
//           </Box>
//         </Box>
//       </Paper>

//       {/* 特色 */}
//       <Paper elevation={3} sx={sectionStyle("#BB86FC")}>
//         <Box display="flex" gap={2}>
//           <Checklist sx={{ fontSize: 40, color: "#BB86FC" }} />
//           <Box>
//             <Typography variant="h6" color="grey.100">
//               工具特色
//             </Typography>
//             <ul style={{ marginTop: 8, paddingLeft: 18, lineHeight: 1.8, color: "white" }}>
//               <li>色票擷取：從參考圖片中自動抓取代表性色彩</li>
//               <li>可自訂色彩數量：依照需求選擇色票顏色數量</li>
//               <li>快速上色：一鍵套用色票到灰階圖，快速完成配色</li>
//               <li>帳帳戶系統與色票紀錄：登入後可儲存色票與上色結果，方便日後使用</li>
//               <li>穩定高效的系統架構：前端使用 React，後端使用 Flask，搭配資料庫儲存使用者資料與色票資訊</li>
//             </ul>
//           </Box>
//         </Box>
//       </Paper>
//     </Stack>
//   );
// }

import React from 'react';
import { Stack, Paper, Typography, Box } from "@mui/material";
import { GpsFixed, Web, Checklist } from "@mui/icons-material";

const sectionStyle = (color) => ({
  flex: 1,                       // 讓三張卡平分寬度
  p: 3,
  borderRadius: 2,
  border: `1px solid ${color}`,
  backdropFilter: "blur(4px)",
  backgroundColor: "#6B7280",
  display: "flex",
//   alignItems: "flex-start",
  gap: 2,
});

export default function About() {
  return (
    <Stack sx={{ maxWidth: 1200, mx: "auto", mt: 2, color: "grey.200" }} spacing={4}>
      {/* 標題 */}
         <div className="flex flex-col items-center">
             <h1 className="ml-2">About</h1>
         </div>

      {/* --- 三張卡片橫向排列，手機版自動縱向 --- */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        sx={{ width: "100%" }}
      >
        {/* 目標 */}
        <Paper elevation={3} sx={sectionStyle("#528CFF")}>
          <GpsFixed sx={{ fontSize: 40, color: "#528CFF" }} />
          <Box>
            <Typography variant="h6" color="grey.100">
              我們的目標
            </Typography>
            <Typography sx={{ mt: 1, lineHeight: 1.7, color: "white" }}>
              我們希望提供一個簡單、實用、不需學習成本的工具，讓使用者可以更快完成配色，專注在創意發想與設計本身。
            </Typography>
          </Box>
        </Paper>

        {/* 網站簡介 */}
        <Paper elevation={3} sx={sectionStyle("#6FCF97")}>
          <Web sx={{ fontSize: 40, color: "#6FCF97" }} />
          <Box>
            <Typography variant="h6" color="grey.100">
              網站簡介
            </Typography>
            <Typography sx={{ mt: 1, lineHeight: 1.7, color: "white" }}>
              這個網站是一個簡單實用的工具，幫助使用者為 logo、圖示或其他簡單圖像快速上色。透過上傳參考圖片…
            </Typography>
          </Box>
        </Paper>

        {/* 工具特色 */}
        <Paper elevation={3} sx={sectionStyle("#BB86FC")}>
          <Checklist sx={{ fontSize: 40, color: "#BB86FC" }} />
          <Box>
            <Typography variant="h6" color="grey.100">
              工具特色
            </Typography>
            <ul style={{ marginTop: 8, paddingLeft: 18, lineHeight: 1.8, color: "white" }}>
              <li>色票擷取：從參考圖片中自動抓取代表性色彩</li>
              <li>可自訂色彩數量：依照需求選擇色票顏色數量</li>
              <li>快速上色：一鍵套用色票到灰階圖</li>
              <li>帳戶系統與色票紀錄：登入可儲存色票</li>
              <li>穩定高效架構：React + Flask</li>
            </ul>
          </Box>
        </Paper>
      </Stack>
    </Stack>
  );
}
