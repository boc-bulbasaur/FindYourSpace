import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import { signOut } from "next-auth/react";

const pages = ['Search', 'Create Listing'];
const pagesEndpoints = ['/search', '/newlisting'];
const settings = ['Edit My Profile','Profile', 'History', 'Logout'];
const settingsEndpoints = ['/EditMyProfile','/profile?user=3', '/history', '/'];

const theme = responsiveFontSizes(createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { size: "extraSmall" },
          style: { fontSize: 8, padding: "4px 2px" }
        }
      ]
    }
  }
}));

export default function NavBar({session}) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  if (session) {
    const { user } = session;
    return (
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Sono',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                find your space
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page, index) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link href={pagesEndpoints[index]}>{page}</Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'Sono',
                  fontWeight: 700,
                  fontSize: 'h6.fontSize',
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                find your space
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page, index) => (
                  <Button
                    key={page}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Link href={pagesEndpoints[index]}>{page}</Link>
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.name || ''} src={user.image || '/static/images/avatar/2.jpg'} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, index) => {
                    if (setting === 'Logout') {
                      return (
                        <MenuItem key={setting} onClick={() => {
                          signOut({ callbackUrl: 'http://localhost:3000/'});
                        }}>
                        <Typography textAlign="center">
                          <Link href={settingsEndpoints[index]}>
                          {setting}
                          </Link>
                        </Typography>
                      </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <Link href={settingsEndpoints[index]}>
                          {setting}
                          </Link>
                        </Typography>
                      </MenuItem>
                      );
                    }
                  }
                  )}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    );
  }
  return (
      <AppBar position="static" >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ThemeProvider theme={theme}>
              <Typography
                variant="subtitle1"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 1,
                  flexGrow: 1,
                  fontFamily: 'Sono',
                  fontWeight: 700,
                  letterSpacing: '.05rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  display: {xs: 'flex', sm: 'none'}
                }}
              >
                find your space
              </Typography>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  flexGrow: 1,
                  fontFamily: 'Sono',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  display: {xs: 'none', sm: 'flex'}
                }}
              >
                find your space
              </Typography>
              <Button
                variant="outlined"
                size="large"
                sx={{ mr: 1, color: 'white', borderColor: 'white', display: {xs: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex'} }}
              >
                <Link href={'/login'}>Log in</Link>
              </Button>
              <Button
                variant="outlined"
                sx={{ mr: 1, color: 'white', borderColor: 'white', display: {xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'none'} }}
              >
                <Link href={'/login'}>Log in</Link>
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ mr: 1, color: 'white', borderColor: 'white', display: {xs: 'none', sm: 'flex', md: 'none', lg: 'none', xl: 'none'} }}
              >
                <Link href={'/login'}>Log in</Link>
              </Button>
              <Button
                variant="outlined"
                size="extraSmall"
                sx={{ mr: 1, color: 'white', borderColor: 'white', display: {xs: 'flex', sm: 'none'} }}
              >
                <Link href={'/login'}>Log in</Link>
              </Button>
              <Button variant="contained" color="secondary" size="large" sx={{mr: 1, display: {xs: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex'}}}>
                <Link href={'/signup'}>Sign up</Link>
              </Button>
              <Button variant="contained" color="secondary" sx={{mr: 1, display: {xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'none'}}}>
                <Link href={'/signup'}>Sign up</Link>
              </Button>
              <Button variant="contained" color="secondary" size="small" sx={{mr: 1, display: {xs: 'none', sm: 'flex', md: 'none', lg: 'none', xl: 'none'}}}>
                <Link href={'/signup'}>Sign up</Link>
              </Button>
              <Button variant="contained" color="secondary" size="extraSmall" sx={{mr: 1, display: {xs: 'flex', sm: 'none'}}}>
                <Link href={'/signup'}>Sign up</Link>
              </Button>
            </ThemeProvider>
          </Toolbar>
        </Container>
      </AppBar>
  );
}