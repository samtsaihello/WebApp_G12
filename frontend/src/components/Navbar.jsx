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
            <div className="mt-0 flex justify-end bg-[#313236]">
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
                    <MenuItem onClick={handlemenuClose1}>Edit Info</MenuItem>
                    <MenuItem onClick={handlemenuClose2}>History</MenuItem>
                    <MenuItem onClick={handlemenuClose3}>Logout</MenuItem>
                </Menu>
                <Dialog open={open} onClose={handleClickAway}>
                    <DialogTitle>{(login) ? 'Login' : 'Register'}</DialogTitle>
                    <DialogContent>
                    {(login) ? <></> : <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Account (email)"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                    {(login) ? <></> :<TextField
                        margin="dense"
                        label="Confirm Password"
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
                    onClick={() => {setLogin(!login)}}
                    >
                    {(login)?'No account? Register!' : 'Already have an account? Login!'}
                    </Typography>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleRegister}>{(login)? 'Login' : 'Register'}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default Navbar