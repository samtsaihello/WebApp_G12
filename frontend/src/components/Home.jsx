import ColorCompare from "./ColorCompare";  
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import { useState } from "react";
import logo from '../assets/0531_1930-removebg-preview.png'; // Adjust the path as necessary

function Home() {
    const [open, setOpen] = useState(false);
    
    const handleClickAway = (event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            setOpen(false);
        }
    }

    const handleClick = () => {
        setOpen(true);
    }

    return (
        <>
            <div className="p-2 w-full h-full text-amber-50 flex flex-col items-center justify-center">
                <img src={logo} alt="Logo" className="w-1/8" />
                {/* <h1 className='ml-2'>Home</h1> */}
                <h1 className="font-bold mb-4" id="title">Palette Genie</h1>
                <h2 id="subtitle" className="mb-8">Extract, Recolor, Inspire</h2>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#313236'}}
                    onClick={handleClick}
                >
                    Click to try!!
                </Button>
            </div>
            <Dialog open={open} onClose={handleClickAway}>
                <DialogTitle className="!ml-auto !mr-auto"><h2 className="ml-auto mr-auto">Scroll to draw our logo!!</h2></DialogTitle>
                <DialogContent>
                    <ColorCompare />
                </DialogContent>
                <DialogActions>
                    <Button></Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Home;