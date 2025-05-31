import { Password } from "@mui/icons-material";
import { TextField, Button, Typography } from "@mui/material";
import { useState } from "react";

function Change({name, account, onSetName}) {
    const [nameState, setNameState] = useState(name);
    const [password, setPassword] = useState("");

    const handleUpdate = async () => {
        if(nameState === name) return;
        else if (password === ""){
            alert("Please enter your password to confirm the change.");
        }
        else if (nameState === "") {
            alert("Name cannot be empty.");
        }
        else if (account === ""){
            alert("Please log in.");
        }
        else {
            const res = await fetch("http://localhost:3000/api/userName", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: nameState,
                    account: account,
                    passWord: password
                })
            });
            const response = await res.json();
            if (res.ok) {
                onSetName(nameState);
                console.log("Update successful");
                alert("Update successful");
                setPassword("");
            } else {
                throw new Error(response.error || "Update failed");
            }
        }
    }

    return (
        <>
            <div className="w-full">
                <p>Edit</p>
                <div className="w-full bg-gray-600 p-3 rounded-lg">
                    <div className="flex flex-col mb-4">
                        <h2 className="!text-2xl">Name</h2>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="email"
                            variant="filled"
                            className="!text-amber-50"
                            InputLabelProps={{
                            style: { color: '#fff' }       // 標籤文字顏色
                            }}
                            InputProps={{
                            style: { color: '#fff' },      // 使用者輸入字顏色
                            }}
                            defaultValue={name}
                            onChange={(e)=> setNameState(e.target.value)}
                            sx={{
                                '& .MuiFilledInput-root': {
                                    backgroundColor: '', // 預設背景色
                                    '&:hover': {
                                    backgroundColor: '#3b3e48', // hover 時背景色
                                    },
                                    '&.Mui-focused': {
                                    backgroundColor: '#3b3e48', // focus 時背景色
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#ffffff', // 標籤文字顏色
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#ffffff', // focus 時標籤文字顏色
                                },
                                input: {
                                    color: '#ffffff', // 輸入文字顏色
                                },
                                }}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <h2 className="!text-2xl">Account</h2>
                        {/* <TextField
                            autoFocus
                            margin="dense"
                            type="email"
                            variant="filled"
                            className="!text-amber-50"
                            InputLabelProps={{
                            style: { color: '#fff' }       // 標籤文字顏色
                            }}
                            InputProps={{
                            style: { color: '#fff' },      // 使用者輸入字顏色
                            }}
                            defaultValue={account}
                            value={accountState}
                            onChange={(e)=> setAccountState(e.target.value)}
                            sx={{
                                '& .MuiFilledInput-root': {
                                    backgroundColor: '', // 預設背景色
                                    '&:hover': {
                                    backgroundColor: '#3b3e48', // hover 時背景色
                                    },
                                    '&.Mui-focused': {
                                    backgroundColor: '#3b3e48', // focus 時背景色
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#ffffff', // 標籤文字顏色
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#ffffff', // focus 時標籤文字顏色
                                },
                                input: {
                                    color: '#ffffff', // 輸入文字顏色
                                },
                                }}
                        /> */}
                        <Typography className="!mt-2 !mb-2">
                            <span className="!text-amber-50">{account}</span>
                        </Typography>
                    </div>
                    <div className="flex flex-col mb-2">
                        <h2 className="!text-2xl"$>Password</h2>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="password"
                            label="Password"
                            variant="filled"
                            className="!text-amber-50"
                            InputLabelProps={{
                            style: { color: '#fff' }       // 標籤文字顏色
                            }}
                            InputProps={{
                            style: { color: '#fff' },      // 使用者輸入字顏色
                            }}
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            sx={{
                            '& .MuiFilledInput-root': {
                                backgroundColor: '', // 預設背景色
                                '&:hover': {
                                backgroundColor: '#3b3e48', // hover 時背景色
                                },
                                '&.Mui-focused': {
                                backgroundColor: '#3b3e48', // focus 時背景色
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#ffffff', // 標籤文字顏色
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#ffffff', // focus 時標籤文字顏色
                            },
                            input: {
                                color: '#ffffff', // 輸入文字顏色
                            },
                            }}
                        />
                    </div>
                    <div className="flex flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            className="!text-amber-50 !ml-auto"
                            sx={{
                                backgroundColor: '#4D697F',
                                '&:hover': {
                                    borderColor: "#50535A",
                                    backgroundColor: "#2F2F2F", // <-- 這就是 hover 顏色
                                    color: "#fff",
                                },
                            }}
                            onClick={handleUpdate}
                        > Submit </Button> 
                    </div>          
                </div>
            </div>
        </>
    );
}

export default Change;