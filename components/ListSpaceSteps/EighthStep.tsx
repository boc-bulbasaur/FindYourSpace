import { Box, BottomNavigation, BottomNavigationAction, Button, Typography, TextField, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';

function Eighth() {
  return (
    <>
    <Typography
      sx={{
        display: 'flex',
        flexGrow: '1',
        maxHeight: '30px',
        alignItems: 'center'
      }}
    >
      To start with, whats your beautiful name?
    </Typography>
    <Box
      sx={{
        margin: '1rem 0',
      }}
    >
      <FormControl
        sx={{
          marginLeft: '1rem',
          display: 'flex',
          justifyContent: 'center',
          flexGrow: '1'
        }}
      >
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
    </Box>
  </>
  );
}
export default Eighth;