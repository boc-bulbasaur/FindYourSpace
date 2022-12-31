import { Box, FormControlLabel, FormGroup, Stack, Checkbox, Typography, TextField, FormControl } from '@mui/material';

function Third({ formData, setFormData}) {

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  return (
    <>
      <Box
        className='title-container'
        sx={{
          marginBottom: '5px'
        }}
      >
      <Typography
        className='text main-title'
        sx={{
          display: 'flex',
          flexGrow: '1',
          maxHeight: '30px',
          alignItems: 'center',
          fontSize: '16px'
        }}
      >
        Share a few details about your space
      </Typography>
      <Typography
        className='text secondary-title'
        sx={{
          display: 'flex',
          flexGrow: '1',
          maxHeight: '30px',
          alignItems: 'center',
          fontSize: '12px',
          color: 'gray'
        }}
      >
        Show off your spaces amenities
      </Typography>
    </Box>
    <Box
      className='form-container'
      sx={{
        margin: '0 0',
        padding: '0',
      }}
    >
      <Stack spacing={2}>
        <Box
          className='form'
          sx={{
            display: 'flex',
          }}
        >
          <FormGroup>
            <FormControl
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
            >
              <FormControlLabel
                control={
                  <Checkbox checked={formData.amenities_attended} onChange={handleChange} name="amenities_attended" />
                }
              label="Attended"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={formData.amenities_gated} onChange={handleChange} name="amenities_gated" />
                }
              label="Gated"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={formData.amenities_electric} onChange={handleChange} name="amenities_electric" />
                }
              label="Electric Vehicle Charged"
              />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl
              component="fieldset"
              sx={{ m: 3 }}
              variant="standard"
            >
              <FormControlLabel
                control={
                  <Checkbox checked={formData.amenities_garage} onChange={handleChange} name="amenities_garage" />
                }
              label="Garage"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={formData.amenities_247} onChange={handleChange} name="amenities_247" />
                }
              label="Available 24/7"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={formData.amenities_clearance} onChange={handleChange} name="amenities_clearance" />
                }
              label="High Clearance"
              />
            </FormControl>
          </FormGroup>
        </Box>
        <Box>
          <TextField
            fullWidth
            id="description"
            label="Enter Description"
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: 'flex-start'
            }}
            onChange={(e) => {
              setFormData({
                ...formData,
                description: e.target.value,
              });
            }}
          >
          </TextField>
        </Box>
        <Box>
          <TextField
            fullWidth
            id="special-information"
            label="Enter Special Information"
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: 'flex-start',
              paddingBottom: 3
            }}
            onChange={(e) => {
              setFormData({
                ...formData,
                _special_information: e.target.value,
              });
            }}
          >
          </TextField>
        </Box>
      </Stack>
    </Box>
  </>
  );
}
export default Third;