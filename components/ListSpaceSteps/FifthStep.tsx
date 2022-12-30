import { Box, Grid, Slider, Typography, Input } from '@mui/material';

function Fifth({ formData, setFormData }) {

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

  const handleMinSBlur = () => {
    if (formData.min_stay < 0) {
      setFormData({
        ...formData,
        min_stay: 0,
      });
    } else if (formData.min_stay > 100) {
      setFormData({
        ...formData,
        min_stay: 100,
      });;
    }
  };

  const handleMaxSBlur = () => {
    if (formData.max_stay < 0) {
      setFormData({
        ...formData,
        max_stay: 0,
      });
    } else if (formData.max_stay > 100) {
      setFormData({
        ...formData,
        max_stay: 100,
      });;
    }
  };

  const handleMinNBlur = () => {
    if (formData.min_notice < 0) {
      setFormData({
        ...formData,
        min_notice: 0,
      });
    } else if (formData.min_notice > 100) {
      setFormData({
        ...formData,
        min_notice: 100,
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
        How long can guests stay?
      </Typography>
    </Box>
    <Box
      className='slider-container'
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
              Minimum Stay
            </Typography>
          </Grid>
          <Grid item xs>
            <Slider
              className='slider'
              value={typeof formData.min_stay === 'number' ? formData.min_stay : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              name="min_stay"
            />
          </Grid>
          <Grid item>
            <Input
              value={formData.min_stay}
              name="min_stay"
              sx={{
                width: '42px'
              }}
              onChange={handleInputChange}
              onBlur={handleMinSBlur}
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
              Maximum Stay
            </Typography>
          </Grid>
          <Grid item xs>
            <Slider
              className='slider'
              value={typeof formData.max_stay === 'number' ? formData.max_stay : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              name="max_stay"
            />
          </Grid>
          <Grid item>
            <Input
              value={formData.max_stay}
              sx={{
                width: '42px'
              }}
              onChange={handleInputChange}
              onBlur={handleMaxSBlur}
              name="max_stay"
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
      {/* <Box
        sx={{
          minWidth: 350
        }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography className="input-slider" gutterBottom>
              Minimum Notice
            </Typography>
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof formData.min_notice === 'number' ? formData.min_notice : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              name="min_notice"
            />
          </Grid>
          <Grid item>
            <Input
              value={formData.min_notice}
              sx={{
                width: '42px'
              }}
              onChange={handleInputChange}
              onBlur={handleMinNBlur}
              name="min_notice"
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
      </Box> */}
    </Box>
    </>
  );
}
export default Fifth;