import React from 'react';
import { alpha } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import What from "./What.jsx"
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  
}));

export default function HeaderUi() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>פרופיל</MenuItem>
      <MenuItem onClick={handleMenuClose}>הגדרות</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit" size="large">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit" size="large">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          size="large">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );




  return (
    <Container className={classes.cardGrid} maxWidth="lg">
    <div className={classes.grow}>
      <AppBar position="static" 
        style={{backgroundColor: "#f5ba13",
        paddingBottom:0
        }}>
        <Toolbar >
          
        <Typography  component="h5" className={classes.title } variant="h5" noWrap >
            Weekly
          </Typography>
          <Typography componenet="h3" variant="h3" align="center" 
          style={{margin:"auto"}}  
          >
           השבוע בעזר
          </Typography>  
           
          {/* <div className={classes.grow} /> */}
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              size="large">
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              edge="end"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              size="large">
              <MoreIcon />
            </IconButton>
          </div> 
        </Toolbar>
        <Toolbar  
         
        //  style={{
        //     alignItems: 'center',
        //     flexDirection: 'row',
        //     flexWrap: 'nowrap',
        //     justifyContent: 'space-around',
        //     minHeight: "0px",
        //     paddingTop:"0.5rem",
        //     paddingBottom:"0.5rem"
        //     }}
            >
            
          <Grid 
            container spacing={2}
            direction= "row"
            alignItems ="center"
            
            
            > 
              <Grid item xs={12}  md={4} style={{paddingBottom:"0px"}}> 
                <Typography align= "center" variant='body1'>סחורה משובחת וטרייה מהחקלאים </Typography>
              </Grid> 
              <Grid item xs={12}  md={4} style={{paddingBottom:"0px", paddingTop:"0px"}}>
                <Typography align= "center" variant='body1'>ניתן להזמין עד ליום רביעי שעה 20:00 </Typography>
              </Grid> 
              <Grid item xs={12}  md={4} style={{paddingTop:"0px"}}>
                <Typography align= "center" variant='body1'>הזמנות יסופקו ביום חמישי</Typography>
            {/* <What/>  */}
              </Grid>
          </Grid>
           
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
    </Container>
  );
}