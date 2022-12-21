import { Box, Stack, Button, Typography, FormControl } from '@mui/material';

function First({ formData, setFormData }) {

  const handleClick = (e) => {
    setFormData({
      ...formData,
      type: e.target.name,
    });
    setTimeout(() => {
      if (document.querySelector('.listing-next-button')) {
        document.querySelector('.listing-next-button').click();
      }
    }, 250)
  }

  return (
  <>
    <Typography
    component={'h1'}
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
            sx={{
              fontSize: '14px',
              paddingBottom: '5px',
              pointerEvents: 'none'
            }}
          >
            Covered Space
          </Typography>
          <Typography
            sx={{
              fontSize: '10px',
              pointerEvents: 'none'
            }}
          >
            Guests will have access to a covered space.
          </Typography>
        </Button>
        <Button
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
            sx={{
              fontSize: '14px',
              paddingBottom: '5px',
              pointerEvents: 'none'
            }}
          >
            Street Parking
          </Typography>
          <Typography
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