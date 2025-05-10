import ColorToggleSelect from "./ColorChoose.jsx";
import { Button } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState, useCallback } from "react";

function Palette(){

    const colorOptions = [
        { color: "#708090" },       // 石板灰
        { color: "#808000" },       // 橄欖綠
        { color: "#C08081" },       // 暗玫瑰
        { color: "#9DC183" },       // 鼠尾草綠
        { color: "#483C32" },       // 灰褐色
        { color: "#4682B4" },       // 鋼藍
        { color: "#B0C4DE" },       // 霧藍
        { color: "#B2BEB5" },       // 灰白
        { color: "#E0B0FF" },       // 淡紫
        { color: "#36454F" },       // 木炭灰
    ];

    const [selectedColors, setSelectedColors] = useState([]);
    const handleSelectColors = useCallback((newSelectedColors) => {
        setSelectedColors(newSelectedColors);
        // console.log(selectedColors)
    },[]);

    console.log(selectedColors)

    return (
        <>
            {/* <Navbar /> */}
            <div className="p-2 w-full bg-[#3b3e48] h-11/12 text-amber-50 flex flex-col items-center justify-center">
                <h1>Palette</h1>
                <br />
                <h2 className="mb-1">Step1: Upload photo that you want to extract color from</h2>
                <Button 
                    variant="outlined" 
                    component="label" 
                    className="!text-amber-50"
                    sx={{
                        borderColor: "#4A4D55", // 自訂邊框色
                        '&:hover': {
                            borderColor: "#50535A",
                            backgroundColor: "#2F2F2F", // <-- 這就是 hover 顏色
                            color: "#fff",
                        },
                    }}
                    startIcon={<FileUploadIcon />}
                >
                Upload Photo
                <input
                    type="file"
                    accept="image/*"
                    hidden
                />
                </Button>
                <br />
                <br />
                <h2 className="mb-1 mt-1">Step2: Choose color to fill up and upload photo that you want to draw</h2>
                <br />
                <ColorToggleSelect colorOptions={colorOptions} onSelectColors={handleSelectColors}  />
                <br />
                <Button 
                    variant="outlined" 
                    component="label" 
                    className="!text-amber-50"
                    sx={{
                        borderColor: "#4A4D55", // 自訂邊框色
                        '&:hover': {
                            borderColor: "#50535A",
                            backgroundColor: "#2F2F2F", // <-- 這就是 hover 顏色
                            color: "#fff",
                        },
                    }}
                    startIcon={<FileUploadIcon />}
                >
                Upload Photo
                <input
                    type="file"
                    accept="image/*"
                    hidden
                />
                </Button>
                <br />
                <br />
            </div>
        </>
    );
};

export default Palette;