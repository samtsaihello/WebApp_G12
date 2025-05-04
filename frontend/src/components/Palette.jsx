import Navbar from "./Navbar.jsx"; 
import { Button } from "@mui/material";

function Palette(){
    return (
        <>
            {/* <Navbar /> */}
            <div className="ml-2">
                <h1>Palette</h1>
                <br />
                <h2 className="mb-1">Step1: Upload photo that you want to extract color from</h2>
                <Button variant="contained" component="label">
                Upload Photo
                <input
                    type="file"
                    accept="image/*"
                    hidden
                />
                </Button>
                <br />
                <br />
                <h2 className="mb-1 mt-1">Step2: Upload phto that you want to draw</h2>
                <Button variant="contained" component="label">
                Upload Photo
                <input
                    type="file"
                    accept="image/*"
                    hidden
                />
                </Button>
            </div>
        </>
    );
};

export default Palette;