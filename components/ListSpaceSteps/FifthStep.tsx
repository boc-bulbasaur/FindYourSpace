import { Box, Grid, styled, Slider, Typography, Input, FormHelperText } from '@mui/material';

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
    if (formData.minStay < 0) {
      setFormData({
        ...formData,
        minStay: 0,
      });
    } else if (formData.minStay > 100) {
      setFormData({
        ...formData,
        minStay: 100,
      });;
    }
  };

  const handleMaxSBlur = () => {
    if (formData.maxStay < 0) {
      setFormData({
        ...formData,
        maxStay: 0,
      });
    } else if (formData.maxStay > 100) {
      setFormData({
        ...formData,
        maxStay: 100,
      });;
    }
  };

  const handleMinNBlur = () => {
    if (formData.minNotice < 0) {
      setFormData({
        ...formData,
        minNotice: 0,
      });
    } else if (formData.minNotice > 100) {
      setFormData({
        ...formData,
        minNotice: 100,
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
        How long can guests stay?
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
              Minimum Stay
            </Typography>
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof formData.minStay === 'number' ? formData.minStay : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              name="minStay"
            />
          </Grid>
          <Grid item>
            <Input
              value={formData.minStay}
              name="minStay"
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
              value={typeof formData.maxStay === 'number' ? formData.maxStay : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              name="maxStay"
            />
          </Grid>
          <Grid item>
            <Input
              value={formData.maxStay}
              sx={{
                width: '42px'
              }}
              onChange={handleInputChange}
              onBlur={handleMaxSBlur}
              name="maxStay"
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
              value={typeof formData.minNotice === 'number' ? formData.minNotice : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              name="minNotice"
            />
          </Grid>
          <Grid item>
            <Input
              value={formData.minNotice}
              sx={{
                width: '42px'
              }}
              onChange={handleInputChange}
              onBlur={handleMinNBlur}
              name="minNotice"
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