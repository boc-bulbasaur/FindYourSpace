import { Box, BottomNavigation, BottomNavigationAction, Button, Typography, TextField, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';

function Fourth({ formData, setFormData }) {
  return (
    <>
      <Box
        sx={{
          marginBottom: '5px'
        }}
      >
      <Typography
        sx={{
          display: 'flex',
          flexGrow: '1',
          maxHeight: '30px',
          alignItems: 'center',
          fontSize: '16px'
        }}
      >
        Add some photos of your space
      </Typography>
      <Typography
        sx={{
          display: 'flex',
          flexGrow: '1',
          maxHeight: '30px',
          alignItems: 'center',
          fontSize: '12px',
          color: 'gray'
        }}
      >
        You'll need at least one to continue. You can add more or modify them later.
      </Typography>
    </Box>
    <Box
      sx={{
        margin: '0 0',
        padding: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #000',
        borderRadius: 2,
        minHeight: 150
      }}
    >
      + Add a Photo
    </Box>
  </>
  );
}
export default Fourth;