import { Box, Grid, Slider, Button, Typography, TextField, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';

function Seventh({ formData, setFormData }) {

  const handleSliderChange = (e, newValue) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value === '' ? '' : Number(e.target.value),
    });
  };

  const handleShortBlur = () => {
    if (formData.shortTermRate < 0) {
      setFormData({
        ...formData,
        shortTermRate: 0,
      });
    } else if (formData.shortTermRate > 100) {
      setFormData({
        ...formData,
        shortTermRate: 100,
      });;
    }
  };

  const handleLongBlur = () => {
    if (formData.longTermRate < 0) {
      setFormData({
        ...formData,
        longTermRate: 0,
      });
    } else if (formData.longTermRate > 100) {
      setFormData({
        ...formData,
        longTermRate: 100,
      });;
    }
  };

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
        Price your space.
      </Typography>
    </Box>
    <Box
      sx={{
        display: 'flex !important',
        flexDirection: 'column !important',
        alignItems: 'space-between !important'
      }}
    >
      <Box
        sx={{
          minWidth: 350,
          paddingBottom: '20px'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography className="input-slider" gutterBottom>
              Short Term Rate
            </Typography>
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof formData.shortTermRate === 'number' ? formData.shortTermRate : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              name="shortTermRate"
            />
          </Grid>
          <Grid item>
            <Input
              value={formData.shortTermRate}
              name="shortTermRate"
              sx={{
                width: '42px'
              }}
              onChange={handleInputChange}
              onBlur={handleShortBlur}
              inputProps={{
                step: 1,
                min: 0,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          minWidth: 350,
          paddingBottom: '20px'
        }}
        >
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography className="input-slider" gutterBottom>
              Long Term Rate
            </Typography>
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof formData.longTermRate === 'number' ? formData.longTermRate : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              name="longTermRate"
            />
          </Grid>
          <Grid item>
            <Input
              value={formData.longTermRate}
              sx={{
                width: '42px'
              }}
              onChange={handleInputChange}
              onBlur={handleLongBlur}
              name="longTermRate"
              inputProps={{
                step: 1,
                min: 0,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
    </>
  );
}
export default Seventh;