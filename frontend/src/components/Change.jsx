import { TextField, Button } from "@mui/material";

function Change() {
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
                            value="Your Name Here"
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
                            value="hello@gmail.com"
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
                        <TextField
                            autoFocus
                            margin="dense"
                            type="password"
                            label="Confirm Password"
                            variant="filled"
                            className="!text-amber-50"
                            InputLabelProps={{
                            style: { color: '#fff' }       // 標籤文字顏色
                            }}
                            InputProps={{
                            style: { color: '#fff' },      // 使用者輸入字顏色
                            }}
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
                            onClick={() => {
                                // Handle save changes
                            }}
                        > Submit </Button> 
                    </div>          
                </div>
            </div>
        </>
    );
}

export default Change;