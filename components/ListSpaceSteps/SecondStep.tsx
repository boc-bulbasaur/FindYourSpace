import { Box, Button, Typography, TextField, FormControl, Stack } from '@mui/material';
import leaflet from "../../public/leaflet.png";
import Image from 'next/image';
function Second({ formData, setFormData }) {
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
        Where is the space located?
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
        Your address is only shared with guests after they've made a reservation
      </Typography>
    </Box>
    <Box
      sx={{
        margin: '0 0',
        padding: '0',
      }}
    >
      <Stack spacing={2}>
       <FormControl
        sx={{
          margin: '1rem',
          display: 'flex',
          justifyContent: 'center'
        }}
       >
        <TextField
            fullWidth
            id="address"
            label="Enter Address"
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: 'flex-start'
            }}
            onChange={(e) => {
              setFormData({
                ...formData,
                _address: e.target.value,
              });
            }}
          >
          </TextField>
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: 0,
            marginTop: '0px !important',
            marginBottom: '5px !important'
          }}
        >
          <Image
            src={leaflet}
            alt={"Thumbnail-alt"}
            width={390}
            height={'auto'}
          />
        </Box>
      </Stack>
    </Box>
  </>
  );
}
export default Second;