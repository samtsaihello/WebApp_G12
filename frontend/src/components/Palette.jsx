import ColorToggleSelect from "./ColorChoose.jsx";
import { Button } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState, useCallback } from "react";
import PaletteIcon from '@mui/icons-material/Palette';

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.padStart(2, '0');     // 不足兩位時補 0
}

function rgbToHex(r, g, b) {
    if ([r, g, b].some(v => v < 0 || v > 255 || !Number.isInteger(v))) {
        throw new RangeError('RGB 值必須是 0–255 的整數');
    }
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

async function getPalette(file, k = 5) {
    const form = new FormData();
    form.append('image', file);   // <input type="file"> 的檔案物件
    form.append('k', String(k));  // 要抓幾個顏色，可省略，預設 5
  
    const res = await fetch('http://localhost:8080/palette', {
      method: 'POST',
      body: form,
    });
    if (!res.ok) throw new Error(await res.text());
    return (await res.json()).palette;   // [[R,G,B], …]
}
  
  

function Palette(){

    // const colorOptions = [
    //     // { color: "#708090" },       // 石板灰
    //     // { color: "#808000" },       // 橄欖綠
    //     // { color: "#C08081" },       // 暗玫瑰
    //     // { color: "#9DC183" },       // 鼠尾草綠
    //     // { color: "#483C32" },       // 灰褐色
    //     // { color: "#4682B4" },       // 鋼藍
    //     // { color: "#B0C4DE" },       // 霧藍
    //     // { color: "#B2BEB5" },       // 灰白
    //     // { color: "#E0B0FF" },       // 淡紫
    //     // { color: "#36454F" },       // 木炭灰
    // ];

    const [selectedColors, setSelectedColors] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);
    const [image, setImage] = useState(null);   

    const handleSelectColors = useCallback((newSelectedColors) => {
        setSelectedColors(newSelectedColors);
    },[]);

    const handleImageUpload = async (event) => {
        await setImage(event.target.files[0]);
        setColorOptions([]);
    }

    const handleGetColor = async () => {
        console.log(image);
        const palette = await getPalette(image, 5);
        for (let i = 0; i < palette.length; i++) {
            const hex = rgbToHex(...palette[i]);
            setColorOptions((prev) => [...prev, { color: hex }]);
        }
        setImage(null);
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className="p-2 w-full bg-[#3b3e48] h-11/12 text-amber-50 flex flex-col items-center justify-center">
                <h1>Palette</h1>
                <br />
                <h2 className="mb-1">Step1: Upload photo that you want to extract color from</h2>
                <div>
                    <Button 
                        variant="outlined" 
                        component="label" 
                        className="!text-amber-50 !mr-4"
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
                    {(image)? "Uploaded!!!" : "Upload Photo"}
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageUpload}
                    />
                    </Button>
                    <Button 
                        variant="contained" 
                        component="label" 
                        className="!text-amber-50"
                        sx={{
                            backgroundColor: "#4A4D55", // 自訂背景色
                            '&:hover': {
                                borderColor: "#50535A",
                                backgroundColor: "#2F2F2F", // <-- 這就是 hover 顏色
                                color: "#fff",
                            },
                        }}
                        startIcon={<PaletteIcon />}
                        onClick={handleGetColor}
                    >
                    Get Color
                    </Button>
                </div>
                <br />
                <br />
                <h2 className="mb-1 mt-1">Step2: Choose color to fill up and upload photo that you want to draw</h2>
                {(colorOptions.length > 0) ? <>
                    <br />
                    <ColorToggleSelect colorOptions={colorOptions} onSelectColors={handleSelectColors}  /> </> : <></>
                }
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