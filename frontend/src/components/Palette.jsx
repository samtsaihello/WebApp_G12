import ColorToggleSelect from "./ColorChoose.jsx";
import { Button, Box, Alert, Collapse, CircularProgress, Tooltip } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState, useCallback } from "react";
import PaletteIcon from '@mui/icons-material/Palette';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

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

function hexToRGB(hex) {
  // 移除 "#" 符號
  hex = hex.replace(/^#/, '');

  // 轉成數字
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
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

async function getColoredImage(file, colors) {
    const form = new FormData();
    form.append('image', file);
    // 將顏色轉換為 RGB 格式
    let i;
    const rgbColors = [];
    for (i = 0; i < colors.length; i++) {
        const rgb = hexToRGB(colors[i]);
        rgbColors.push(rgb);
    }
    console.log(rgbColors);
    form.append('palette', JSON.stringify(rgbColors));  // 將顏色陣列轉為 JSON 字串

    const res = await fetch('http://localhost:8080/recolor', {
        method: 'POST',
        body: form,
    });
    const response = await res.json();
    console.log(response);
    if (!res.ok) {
        const errText = await res.text(); // 把錯誤頁抓出來看
        throw new Error(`HTTP ${res.status}: ${errText}`);
    }
    return response.output_image_path;
}
  

function Palette({account}){

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
    const [imagePreview, setImagePreview] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const [secondImagePreview, setSecondImagePreview] = useState(null);
    const [colorAlert, setColorAlert] = useState(false);
    const [coloredImageDone, setColoredImageDone] = useState(false);
    const [coloredImage, setColoredImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [paletteName, setPaletteName] = useState("");

    const handleSelectColors = useCallback((newSelectedColors) => {
        setSelectedColors(newSelectedColors);
    },[]);

    const handleImageUpload = async (event) => {
        console.log(account);
        await setImage(event.target.files[0]);
        setColorOptions([]);
        if (event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setImagePreview(imageUrl);
        }
        console.log(image);
    }

    const handleGetColor = async () => {
        console.log(image);
        setColorOptions([]);
        const palette = await getPalette(image, 8);
        for (let i = 0; i < palette.length; i++) {
            const hex = rgbToHex(...palette[i]);
            setColorOptions((prev) => [...prev, { color: hex }]);
        }
    }

    const handleSecondImage = async (event) => {
        await setSecondImage(event.target.files[0]);
        if (event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            console.log(imageUrl);
            setSecondImagePreview(imageUrl);
            setColoredImageDone(false);
            setColoredImage(null);
        }
    }

    const handleColoredImage = async () => {
        if(selectedColors.length === 0) {
            setColorAlert(true);
            return;
        }
        setLoading(true);
        console.log(selectedColors);
        const path = await getColoredImage(secondImage, selectedColors);
        if(path){
            setColoredImageDone(true);
            setColoredImage("http://localhost:8080/" + String(path));
            setSecondImagePreview(null);
            setLoading(false);
            const imgRes = await fetch("http://localhost:8080/" + String(path));
            const blob = await imgRes.blob();
            const url = URL.createObjectURL(blob);

            // 自動下載
            const link = document.createElement("a");
            link.href = url;
            link.download = "recolored.jpg"; // 使用者看到的檔名
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // 釋放 URL 物件
            URL.revokeObjectURL(url);

        }
    }

    const handleClickAway = (event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            setOpen(false);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = async () => {
        if(paletteName === "") {
            alert("Please enter a palette name!");
        }
        else if(selectedColors.length === 0) {
            alert("Please select at least one color!");
            setOpen(false);
        }
        else if(!account) {
            alert("Please log in first!");
            setOpen(false);
        }
        else{
            const res = await fetch('http://localhost:3000/api/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: account,
                    description: paletteName,
                    color: selectedColors,
                }),
            });
            const response = await res.json();
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${response.error || 'Unknown error'}`);
            } else {
                console.log("Palette saved successfully!");
                setPaletteName("");
                setOpen(false);
            }
        }
    }

    const handleReset = () => {
        setSelectedColors([]);
        setColorOptions([]);
        setImage(null);
        setImagePreview(null);
        setSecondImage(null);
        setSecondImagePreview(null);
        setColoredImageDone(false);
        setColoredImage(null);
        setLoading(false);
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className="p-2 w-full bg-[#3b3e48] text-amber-50 flex flex-col items-center overflow-y-auto">
                <Button sx={{color: "white"}} onClick={handleReset}>
                    <h1 className="mt-2">Palette</h1>
                </Button>
                <br />
                <h2 className="mb-1">Step1: Upload photo to extract color</h2>
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
                        onClick={() =>{
                            setSecondImagePreview(secondImagePreview);
                            setColoredImageDone(false);
                            setColoredImage(null);
                        }}
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
                {imagePreview && (
                    <Box mt={2} className="flex justify-center">
                    <img src={imagePreview} alt="預覽圖片" style={{ maxWidth: '50%', maxHeight: 300 }} />
                    </Box>
                )}
                <br />
                <br />
                <h2 className="mb-1 mt-1">Step2: Choose color to fill up and upload photo to draw</h2>
                {(colorOptions.length > 0) ? <>
                    <br />
                    <ColorToggleSelect colorOptions={colorOptions} onSelectColors={handleSelectColors}  /> </> : <></>
                }
                {secondImagePreview && (
                    <Box mt={2} className="flex justify-center">
                    <img src={secondImagePreview} alt="預覽圖片" style={{ maxWidth: '50%', maxHeight: 300 }} />
                    </Box>
                )}
                {coloredImage && (
                    <Box mt={2} className="flex justify-center">
                    <img src={coloredImage} alt="預覽圖片" style={{ maxWidth: '50%', maxHeight: 300 }} />
                    </Box>
                )}
                <br />
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
                    {(secondImage)? "Uploaded!!!" : "Upload Photo"}
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onInput={handleSecondImage}
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
                            startIcon={(loading) ? <CircularProgress size={20} color="inherit" /> : <PaletteIcon />}
                            onClick={handleColoredImage}
                        >
                        {(loading)? "Loading" : (coloredImageDone) ? "DONE!!!" : "Recolor"}
                    </Button>
                    {
                        (coloredImageDone) ? 
                        <Button 
                            variant="contained" 
                            className="!text-amber-50 !ml-4"
                            sx={{
                                backgroundColor: "#4A4D55", // 自訂背景色
                                '&:hover': {
                                    borderColor: "#50535A",
                                    backgroundColor: "#2F2F2F", // <-- 這就是 hover 顏色
                                    color: "#fff",
                                },
                            }}
                            onClick={() => setOpen(true)}
                        >
                            Save Palette
                        </Button> : <></>
                    }
                </div>
                <br />
                <Collapse in={colorAlert}>
                    <Alert 
                        variant="filled" 
                        severity="error" 
                        onClose={() => setColorAlert(false)}
                    >
                        Please select at least one color!
                    </Alert>
                </Collapse>
                <br />
                <Dialog open={open} onClose={handleClickAway}>
                    <DialogTitle>Save Palette</DialogTitle>
                    <DialogContent>
                    {<TextField
                        autoFocus
                        margin="dense"
                        label="Palette Name"
                        type="text"
                        value={paletteName}
                        fullWidth
                        variant="standard"
                        onChange={(e)=> setPaletteName(e.target.value)}
                    />}
                    <br/>
                    <Box sx={{ display: 'flex', gap: 1 , mt:3}}>
                        {selectedColors.map((color) => (
                            <Tooltip key={color} title={color} arrow>
                            <Box
                                sx={{
                                width: 24,
                                height: 24,
                                bgcolor: color,
                                borderRadius: 1,
                                // border: '1px solid #ccc',
                                cursor: 'pointer',
                                }}
                            />
                            </Tooltip>
                        ))}
                    </Box>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default Palette;