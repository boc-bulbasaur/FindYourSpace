import { Box, Grid, Slider, Typography, Input } from '@mui/material';

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
    if (formData.short_term_rate < 0) {
      setFormData({
        ...formData,
        short_term_rate: 0,
      });
    } else if (formData.short_term_rate > 100) {
      setFormData({
        ...formData,
        short_term_rate: 100,
      });;
    }
  };

  const handleLongBlur = () => {
    if (formData.long_term_rate < 0) {
      setFormData({
        ...formData,
        long_term_rate: 0,
      });
    } else if (formData.long_term_rate > 100) {
      setFormData({
        ...formData,
        long_term_rate: 100,
      });;
    }
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
              value={typeof formData.short_term_rate === 'number' ? formData.short_term_rate : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              name="short_term_rate"
            />
          </Grid>
          <Grid item>
            <Input
              value={formData.short_term_rate}
              name="short_term_rate"
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
              value={typeof formData.long_term_rate === 'number' ? formData.long_term_rate : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              name="long_term_rate"
            />
          </Grid>
          <Grid item>
            <Input
              value={formData.long_term_rate}
              sx={{
                width: '42px'
              }}
              onChange={handleInputChange}
              onBlur={handleLongBlur}
              name="long_term_rate"
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