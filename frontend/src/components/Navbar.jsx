import {Button} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


function Navbar() {
    const [open, setOpen] = useState(false)
    const [login, setLogin] = useState(true)

    const handleClickAway = (event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            setOpen(false);
            setLogin(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
        setLogin(true); 
    }

    const handleRegister = () => {
        setOpen(false);
        setLogin(true);
        // TODO: handle register
    }

    return (
        <>
            <div className="mt-0 flex justify-end bg-indigo-400">
                <Button size="large" color="primary" className="!text-amber-50 !ml-auto"> About </Button>
                <Button size="large" color="primary" className="!text-amber-50"> Palette </Button>
                <Button 
                    size="large" 
                    color="primary" 
                    className="!text-amber-50" 
                    startIcon={<AccountCircleIcon/>}
                    onClick={() => {
                        setOpen(true)
                    }}
                > Login </Button>
                <Dialog open={open} onClose={handleClickAway}>
                    <DialogTitle>{(login) ? '登入' : '註冊'}</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="帳號"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="密碼"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                    {(login) ? <></> :<TextField
                        margin="dense"
                        label="確認密碼"
                        type="password"
                        fullWidth
                        variant="standard"
                    />}
                    <Typography
                    variant="body2"
                    sx={{
                        mt: 1,
                        color: 'primary.main',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                    }}
                    onClick={() => {setLogin(!login); console.log(login)}}
                    >
                    {(login)?'沒有帳號？註冊' : '已經有帳號？登入'}
                    </Typography>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleRegister}>{(login)? '登入' : '註冊'}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default Navbar