import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Info() {
    const navigate = useNavigate();

    return (
        <>
            {/* <Navbar /> */}
            <h1 className="ml-2">User Info</h1>
            <div className="flex">
                <div className="mt-6 ml-10">
                    <Button component="label" onClick={() => navigate('/info/change')}>change</Button>
                    <br />
                    <Button component="label" onClick={() => navigate('/info/history')}>history</Button>
                </div>
                <div className="mt-6 ml-10">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Info;