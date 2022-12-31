import { Box, Stack, Button, Typography, FormControl } from '@mui/material';

function First({ formData, setFormData }) {

  const handleClick = (e) => {
    setFormData({
      ...formData,
      type: e.target.name,
    });
    setTimeout(() => {
      if (document.querySelector('.button-primary')) {
        document.querySelector('.button-primary').click();
      }
    }, 250)
  }

  return (
  <>
    <Typography
      component={'h1'}
      className='text main-title'
      sx={{
        display: 'flex',
        flexGrow: '1',
        maxHeight: '30px',
        alignItems: 'center'
      }}
    >
      What type of space will guests have?
    </Typography>
    <Box
      className='step-container'
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
       <Stack spacing={2}>
        <Button
          className='select-button covered'
          value="Covered"
          name="Covered"
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: 'flex-start',
          }}
          onClick={handleClick}
        >
          <Typography
            className='text button-text primary-select-text'
            sx={{
              fontSize: '14px',
              paddingBottom: '5px',
              pointerEvents: 'none'
            }}
          >
            Covered Space
          </Typography>
          <Typography
            className='text button-text secondary-select-text'
            sx={{
              fontSize: '10px',
              pointerEvents: 'none'
            }}
          >
            Guests will have access to a covered space.
          </Typography>
        </Button>
        <Button
          className='select-button uncovered'
          value="Uncovered"
          name="Uncovered"
          variant="outlined"
          onClick={handleClick}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: 'flex-start'
          }}
        >
           <Typography
            className='text button-text secondary-select-text'
            sx={{
              fontSize: '14px',
              paddingBottom: '5px',
              pointerEvents: 'none'
            }}
          >
            Uncovered Space
          </Typography>
          <Typography
            sx={{
              fontSize: '10px',
              pointerEvents: 'none'
            }}
          >
            Guests will have access to an uncovered space.
          </Typography>
        </Button>
        <Button
          value="Street"
          name="Street"
          variant="outlined"
          onClick={handleClick}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: 'flex-start'
          }}
        >
           <Typography
            className='select-button uncovered'
            sx={{
              fontSize: '14px',
              paddingBottom: '5px',
              pointerEvents: 'none'
            }}
          >
            Street Parking
          </Typography>
          <Typography
            className='text button-text secondary-select-text'
            sx={{
              fontSize: '10px',
              pointerEvents: 'none'
            }}
          >
            Guests will have access to a space on the street.
          </Typography>
        </Button>
      </Stack>
      </FormControl>
    </Box>
  </>
  );
}
export default First;