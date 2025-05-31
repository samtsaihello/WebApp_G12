import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';

function Info() {
    const navigate = useNavigate();

    return (
        <>
            <div className="p-2 w-full bg-[#3b3e48] h-11/12 text-amber-50 flex flex-col items-center">
                <h1 className="ml-2 mt-2">User Info</h1>
                <div className="flex w-full justify-evenly">
                    <div className="mt-6" id="info-container">
                        <Button 
                            component="label" 
                            onClick={() => navigate('/info/change')}
                            className="!text-amber-50"
                            sx={{
                                borderColor: "#4A4D55", // 自訂邊框色
                                '&:hover': {
                                    borderColor: "#50535A",
                                    backgroundColor: "#2F2F2F", // <-- 這就是 hover 顏色
                                    color: "#fff",
                                },
                            }}
                            startIcon={<EditIcon />}
                        >Edit</Button>
                        <br />
                        <Button 
                            component="label" 
                            onClick={() => navigate('/info/history')}
                            className="!text-amber-50"
                            sx={{
                                borderColor: "#4A4D55", // 自訂邊框色
                                '&:hover': {
                                    borderColor: "#50535A",
                                    backgroundColor: "#2F2F2F", // <-- 這就是 hover 顏色
                                    color: "#fff",
                                },
                            }}
                            startIcon={<HistoryIcon />}
                        >history</Button>
                    </div>
                    {/* <Divider orientation="vertical" flexItem className="bg-white" sx={{ height: 120, borderColor: '#fff', mx: 2 }} /> */}
                    <div className="mt-6 ml-10 w-2/3">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Info;