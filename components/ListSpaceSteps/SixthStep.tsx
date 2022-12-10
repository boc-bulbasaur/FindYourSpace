import { Box, BottomNavigation, BottomNavigationAction, Button, Typography, TextField, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';


function Sixth( {formData, setFormData }) {

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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateRangePicker
        displayStaticWrapperAs="desktop"
        value={formData.availability}
        onChange={(nv) => {
          setFormData({
            ...formData,
            availability: nv
          });
        }}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </>
        )}
      />
    </LocalizationProvider>
    </Box>
  </>
  );
}
export default Sixth;