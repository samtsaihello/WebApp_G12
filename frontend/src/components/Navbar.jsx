// import {Button, Menu, MenuItem} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AppBar, Toolbar, IconButton, Button, Menu, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Typography, useMediaQuery, useTheme, Drawer, List, ListItem, ListItemText,
  Alert
} from '@mui/material';


function Navbar({inputname, onSetAccount, onSetName}) {
    const [open, setOpen] = useState(false)
    const [login, setLogin] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [name, setName] = useState("");
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const handleRegister = async () => {
        // TODO: handle register
        if(!login){
            console.log(name, account, password, confirmPassword);
            if(name === ""){
                alert("Please enter your name");
            }
            else if(!account.includes('@')){
                alert("Please enter a valid email address");
            }
            else if(password === ""){
                alert("Please enter your password");
            }
            else if(password !== confirmPassword){
                alert("Passwords do not match");
            }
            else{
                // const form = new FormData();
                // form.append('name', name);
                // form.append('account', account);
                // form.append('passWord', password);
                const res = await fetch('http://localhost:3000/api/userName', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        account,
                        passWord : password,
                    }),
                });
                const response = await res.json();
                console.log(response);
                if(!res.ok){
                    throw new Error(response.error || 'Failed to register');
                }
                else{
                    console.log("Register successfully");
                    onSetAccount(account);
                    onSetName(name);
                    setLogin(true);
                    setLoggedIn(true);
                    // setName("");
                    setAccount("");
                    setPassword("");
                    setConfirmPassword("");
                    setOpen(false);
                }
            }
        }
        else {
            if(account === ""){
                alert("Please enter your account");
            }
            else if (password === ""){
                alert("Please enter your password");
            }
            else{
                const res = await fetch('http://localhost:3000/api/userName/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        account,
                        passWord : password,
                    }),
                });
                const response = await res.json();
                console.log(response);
                if(!res.ok){
                    alert(response.error || 'Failed to login');
                }
                else{
                    console.log("Login successfully");
                    onSetAccount(account);
                    onSetName(response.name);
                    setName(response.name);
                    setLoggedIn(true);
                    setOpen(false);
                    setAccount("");
                    setPassword("");
                    setConfirmPassword("");
                }
            }
        }
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
        onSetAccount("");
        onSetName("");
    }

    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('300px'));
    const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Palette', path: '/pal' }
  ];

    return (
        <>
            {/* <div className="fixed mt-0 flex justify-end bg-[#313236] w-full z-50 h-12"> */}
                {/* <Button size="large" color="primary" className="!text-amber-50 !ml-auto" onClick={() => navigate('/')}> Home </Button>
                <Button size="large" color="primary" className="!text-amber-50" onClick={() => navigate('/about')}> About </Button>
                <Button size="large" color="primary" className="!text-amber-50" onClick={() => navigate('/pal')}> Palette </Button>
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
                > Login </Button>} */}
                <AppBar position="fixed" sx={{ bgcolor: '#313236', height: '48px' }}>
                    <Toolbar sx={{ justifyContent: 'space-between', minHeight: '48px !important' }}>
                    {isMobile ? (
                        <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
                        <MenuIcon />
                        </IconButton>
                    ) : (
                        <div className="flex ml-auto space-x-4">
                        {menuItems.map(item => (
                            <Button key={item.label} className="!text-amber-50" onClick={() => navigate(item.path)}>
                            {item.label}
                            </Button>
                        ))}
                        {loggedIn ? (
                            <Button
                            variant="outlined"
                            className="!text-amber-50"
                            startIcon={<LogoutIcon />}
                            onClick={(event) => setMenuOpen(event.currentTarget)}
                            >
                            {inputname}
                            </Button>
                        ) : (
                            <Button
                            className="!text-amber-50"
                            startIcon={<AccountCircleIcon />}
                            onClick={() => setOpen(true)}
                            >
                            Login
                            </Button>
                        )}
                        </div>
                    )}
                    </Toolbar>
                </AppBar>

                {/* Drawer for mobile */}
                <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <List sx={{ width: 220 }}>
                    {menuItems.map(item => (
                        <ListItem button key={item.label} onClick={() => { navigate(item.path); setDrawerOpen(false); }}>
                        <ListItemText primary={item.label} />
                        </ListItem>
                    ))}
                    {loggedIn ? (
                        <>
                        <ListItem button onClick={handlemenuClose1}><ListItemText primary="Edit Info" /></ListItem>
                        <ListItem button onClick={handlemenuClose2}><ListItemText primary="History" /></ListItem>
                        <ListItem button onClick={handlemenuClose3}><ListItemText primary="Logout" /></ListItem>
                        </>
                    ) : (
                        <ListItem button onClick={() => { setOpen(true); setDrawerOpen(false); }}>
                        <ListItemText primary="Login" />
                        </ListItem>
                    )}
                    </List>
                </Drawer>
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Account (email)"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {(login) ? <></> :<TextField
                        margin="dense"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
            {/* </div> */}
        </>
    )
}

export default Navbar