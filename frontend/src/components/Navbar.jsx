import {Button, Menu, MenuItem} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Navbar() {
    const [open, setOpen] = useState(false)
    const [login, setLogin] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(null);

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
        setLoggedIn(true);
    }

    const handlemenuClose = () => {
        setMenuOpen(null);
    }

    const handlemenuClose1 = () => {
        setMenuOpen(null);
        navigate('/info/change');
    }

    const handlemenuClose2 = () => {
        setMenuOpen(null);
        navigate('/info/history');
    }

    const handlemenuClose3 = () => {
        setMenuOpen(null);
        setLoggedIn(false);
    }

    const navigate = useNavigate();

    return (
        <>
            <div className="mt-0 flex justify-end bg-indigo-400">
                <Button size="large" color="primary" className="!text-amber-50 !ml-auto" onClick={() => navigate('/')}> Home </Button>
                <Button size="large" color="primary" className="!text-amber-50" onClick={() => navigate('/about')}> About </Button>
                <Button size="large" color="primary" className="!text-amber-50" onClick={() => navigate('/palette')}> Palette </Button>
                {(loggedIn)? 
                <Button 
                    size="large" 
                    color="primary" 
                    className="!text-amber-50" 
                    startIcon={<LogoutIcon/>}
                    onClick={(event) => {
                        setMenuOpen(event.currentTarget);
                    }}
                > 名字 </Button>
                : <Button 
                    size="large" 
                    color="primary" 
                    className="!text-amber-50" 
                    startIcon={<AccountCircleIcon/>}
                    onClick={() => {
                        setOpen(true)
                    }}
                > Login </Button>}
                <Menu
                    open={Boolean(menuOpen)}
                    anchorEl={menuOpen}
                    onClose={handlemenuClose}
                >
                    <MenuItem onClick={handlemenuClose1}>更改email或密碼</MenuItem>
                    <MenuItem onClick={handlemenuClose2}>查看過去紀錄</MenuItem>
                    <MenuItem onClick={handlemenuClose3}>登出</MenuItem>
                </Menu>
                <Dialog open={open} onClose={handleClickAway}>
                    <DialogTitle>{(login) ? '登入' : '註冊'}</DialogTitle>
                    <DialogContent>
                    {(login) ? <></> : <TextField
                        autoFocus
                        margin="dense"
                        label="名字"
                        type="text"
                        fullWidth
                        variant="standard"
                    />}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="帳號 (email)"
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